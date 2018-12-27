import { Session } from './session';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/share';
import 'rxjs/operators/takeWhile';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { CallType, CallDirection, CallIntalkSubtype } from '../../ua-utils';

import { UAnewRTCSessionData } from '../../ua-utils';
import { filter, scan, map, startWith } from 'rxjs/operators';


declare type EndcallCallback = (callData: any) => void;


/**
 * Angular wrapper for JSSip.session
 */
export class Call {

    public target: string;
    public direction: CallDirection;
    public id: string;
    public type: CallType;
    public inTalkSubtype: CallIntalkSubtype;
    public living = false;
    public duration: number;
    public micEnabled = true;
    public speakerEnabled = true;
    public liveDuration: Observable<number>;
    public incomingDTMF: Observable<string>;
    public outgoingDTMF: Observable<string>;
    public _session: Session;
    public status: Observable<any>;
    private endingCallback: (data) => void;


    constructor() {

    }

    hangup() {
        if (this.living) {
            this._session.hangup();
            this.living = false;
        }
    }

    answer() {
        if (this.living) {
            this._session.answer();
        }
    }

    hold() {
        if (this.living) {
            this._session.hold();
        }
    }

    unhold() {
        if (this.living) {
            this._session.unhold();
        }
    }

    mute() {
        if (this.living) {
            this._session.mute();
        }
    }

    unmute() {
        if (this.living) {
            this._session.unmute();
        }
    }

    sendDTMF(d: string, event: PointerEvent =  null) {

        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        this._session.sendDTMF(d);
    }


    registerEndCallback(fn: (data) => void) {
        this.endingCallback = fn;
    }

    setSession(rtcData: UAnewRTCSessionData) {

        this.living = true;

        this._session = rtcData.session;

        this._session.status.subscribe(status=>{
            if(status==='done'){
                this.living = false;
            }
        })

        this.target = this._session.target;
        this.direction = this._session.direction;
        this.id = this._session.id;


        this.status = combineLatest(
            this._session.status.asObservable(),
            this._session.inTalkStatus.asObservable().pipe(startWith('')),
            (type, subtype) => {

                if (type !== 'active') {
                    subtype = '';
                }

                this.type = type;
                this.inTalkSubtype = <CallIntalkSubtype>subtype;

                if (type === 'done') {
                    this.living = false;
                    if (this.endingCallback) {
                        this.endingCallback({
                            target: this.target,
                            direction: this.direction,
                            id: this.id,
                            type: this.type,
                            inTalkSubtype: this.inTalkSubtype,
                            duration: this.duration * 1000
                        });
                    }
                }
                return { type, subtype };
            }
        );

        this.duration = 0;
        this.liveDuration = interval(1000)
                                .takeWhile(() => this.living)
                                .switchMap(c => {
                                    this.duration++;
                                    const value = (this.duration * 1000) +1;
                                    return Observable.of(value); // milliseconds, so we void 0 == false on *ngIf
                                })
                                .publishReplay(1)
                                .refCount();

        const dtmfFeed = this._session.dtmf.asObservable().share();

        this.incomingDTMF = dtmfFeed.pipe(
                                filter(d => d.originator === 'remote'),
                                map(d => d.code),
                                scan((current, code) => `${current} ${code}`, ''));

        this.outgoingDTMF = dtmfFeed.pipe(
                                filter(d => d.originator === 'local'),
                                map(d => d.code),
                                scan((current, code) => `${current} ${code}`, ''));


    }


    getCallOptions() {
        return this._session.callOptions;
    }

    hydrate(raw) {
        if (!raw) {
          return false;
        }
        this.id = raw.id;
        this.direction = raw.direction;
        this.duration = raw.duration;
        this.type = raw.type;
        this.inTalkSubtype = raw.subtype || null;
        this.target = raw.target;
        this.status = of({
            type: this.type,
            subtype: this.inTalkSubtype
        });
    }

    toggleMic() {
        this.micEnabled = !this.micEnabled;
        this._session.callOptions.toggleMic();
    }

    toggleSpeaker() {
        this.speakerEnabled = !this.speakerEnabled;
        this._session.callOptions.toggleSpeaker();
    }

    get icon() {
        const type = this.type;
        if (type === 'ringing') {
            return 'ring_volume';
        }

        if (type === 'missed') {
            return 'phone_missed';
        }

        if (type === 'active') {

            if (this.inTalkSubtype === 'hold') {
                return 'phone_paused';
            }
            return 'phone_in_talk';
        }

        return 'call_end';
    }

}


