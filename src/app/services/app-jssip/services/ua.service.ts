import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/publishReplay';
import { MatDialog } from '@angular/material';
import { Injectable, NgZone } from '@angular/core';
import { UA } from 'jssip';
import { ConfigurationService } from './configuration.service';

import {
    UAEvent,
    UAStatus,
    UAMessage,
    UAMessageData,
    UAconnectingData,
    UAconnectedData,
    UAdisconnectedData,
    UAregisteredData,
    UAunregisteredData,
    UAregistrationFailedData,
    UAregistrationExpiringData,
    UAnewMessageData,
    UAnewRTCSessionData
} from '../ua-utils';
import { Session } from './ua.service/session';
import { CallOptions } from './ua.service/call-options';
import { LoggerService } from './logger.service';

@Injectable()
export class UaService {

    public notifier: Subject<UAMessage>;
    public status: BehaviorSubject<UAStatus>;

    private ua: UA;

    private cacheOptions = [];

    constructor(
        private config: ConfigurationService,
        public loggerService: LoggerService,
        private ngZone: NgZone
    ) {
        this.notifier = new Subject<UAMessage>();
        this.status = new BehaviorSubject<UAStatus>(this._generateStatus('disconnected'));


    }

    connect() {
        this.ua = new UA(this.config.getConfiguration());
        this.ngZone.runOutsideAngular(() => {
            this.ua.start();
        });
        this._wireMessageSubject();
        this._wireStatusSubject();
    }

    disconnect() {
        this.ua.unregister({ all: true });
        this.ua.stop();
    }


    async call(target, hasVideo) {
        const callOptions = new CallOptions(this.config, hasVideo);
        const opts = await callOptions.get();

        // FIFO cache; we will need these opts later
        this.cacheOptions.push(callOptions);

        const session = this.ua.call(target, opts);


    }


    async sendMsg(target, content) {

        const eventHandlers = {
          'succeeded': function(e){
            console.log(e)
          },
          'failed':    function(e){
            console.log(e)
          }
        };

        const options = {
          'eventHandlers': eventHandlers
        };

        this.ua.sendMessage(target, content, options);
    }

    private _wireMessageSubject(): void {
        [
            'connected',
            'disconnected',
            'registered',
            'unregistered',
            'registrationFailed',
            'registrationExpiring',
            'newRTCSession',
            'newMessage'
        ].map(event => {
            this.ua.on(event, e =>
                this.ngZone.run(() =>
                    this.notifier.next(this._parseEvent(<UAEvent>event, e))
                )
            );
        });
    }

    private _wireStatusSubject(): void {
        [
            'connected',
            'disconnected',
            'registered',
            'unregistered'
        ].map(event => {
            this.ua.on(event, e => {
                this.ngZone.run(() => this.status.next(this._generateStatus(<UAEvent>event)))
            }
            );
        });
    }

    private _generateStatus(status: UAEvent): UAStatus {
        return {
            connected: (status === 'connected' || status === 'registered'),
            status
        };
    }


    private _parseEvent(name: UAEvent, event: any): UAMessage {
        let payload: UAMessageData;

        switch (name) {
            case 'connecting': {
                payload = this._hydratePayload<UAconnectingData>(event, ['socket', 'attemps']);
                break;
            }
            case 'connected': {
                payload = this._hydratePayload<UAconnectedData>(event, ['socket']);
                break;
            }
            case 'disconnected': {
                payload = this._hydratePayload<UAdisconnectedData>(event, ['socket', 'error', 'code', 'reason']);
                break;
            }
            case 'registered': {
                payload = this._hydratePayload<UAregisteredData>(event, ['response']);
                break;
            }
            case 'unregistered': {
                payload = this._hydratePayload<UAunregisteredData>(event, ['response', 'cause']);
                break;
            }
            case 'registrationFailed': {
                payload = this._hydratePayload<UAregistrationFailedData>(event, ['response', 'cause']);
                break;
            }
            case 'registrationExpiring': {
                payload = this._hydratePayload<UAregistrationExpiringData>(event, ['msg']);
                break;
            }
            case 'newRTCSession': {
                console.log(event)
                payload = this._hydratePayload<UAnewRTCSessionData>(event, ['originator', 'request']);
                let callOptions;
                if (payload['originator'] === 'local') {
                    callOptions = this.cacheOptions.shift();
                    // this.loggerService.addLog('Outgoing call')
                } else {

                    // const remoteVideo = <HTMLVideoElement>document.getElementById("remoteVideo")
                    if(event.request.data.indexOf("m=video") === -1)
                    {
                        console.log("no Video")
                        callOptions = new CallOptions(this.config, false);
                    }
                    else{
                        console.log("has Video")
                        callOptions = new CallOptions(this.config, true);
                    }
                    
                    // this.loggerService.addLog('Incoming call')

                }

                payload['session'] = new Session(event['session'], callOptions);
                payload['session'].resolveCallOptions();

                break;
            }
            case 'newMessage': {
                console.log(event)
                payload = this._hydratePayload<UAnewMessageData>(event, ['originator', 'session', 'request']);
                if (payload['originator'] === 'remote') {
                    this.loggerService.addLog(event.request.body)
                }
                break;
            }
            default: {
                throw new Error('unsuported event');
            }
        }

        return <UAMessage>{
            event: name,
            data: payload
        };

    }

    private _hydratePayload<T>(event, fields): T {
        return <T>fields.reduce((ret, field) => {
            if (!event) {
                return ret;
            }
            ret[field] = event[field] || null;
            return ret;
        }, {});
    }
}
