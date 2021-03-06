import { session as JSSipSession, Utils as JSSIPUtils, stream as JSSIPStream } from 'jssip';

import { CallType, CallDirection, CallIntalkSubtype, DTMFSignal } from '../../ua-utils';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

// import * as moment from 'moment';

import { CallOptions } from './call-options';
import { LoggerService } from '../logger.service';

/**
 * Angular wrapper for JSSip.session
 */
export class Session {

    private _session: JSSipSession;

    public callOptions: CallOptions;

    private answerOptions;

    public status = new BehaviorSubject<CallType>('ringing');

    public inTalkStatus = new Subject<CallIntalkSubtype>();
    public muted = new Subject<boolean>();
    public dtmf = new Subject<DTMFSignal>();

    public incomingStream = new BehaviorSubject<any>(null);

    private _localStream: JSSIPStream;

    constructor(sessionRaw: JSSipSession, callOptions: CallOptions) {
        this._session = sessionRaw;
        this.callOptions = callOptions;
        this.inTalkStatus.next(null);

        this._wireUpEvents();
    }


    async resolveCallOptions() {
        if (this.direction === 'IN') {
            this.answerOptions = await this.callOptions.get();
        }
    }

    get direction(): CallDirection {
        return this._session['_direction'] === 'incoming' ? 'IN' : 'OUT';
    }

    get id() {
        return this._session.id;
    }

    get target() {
        return this._session.remote_identity.uri.user;
    }

    get usernameTarget() {
        return this._session.remote_identity.display_name || '';
    }

    private _wireUpEvents() {
        this._session
            .on('connecting', (e) => this.onConnecting())
            .on('peerconnection', (e) => this.onPeerConection())
            .on('progress', (e) => this.onProgress())
            .on('accepted', (e) => this.onAccepted(e))
            .on('failed', (e) => this.onFailed(e))
            .on('newDTMF', (e) => this.onDTMF(e))
            .on('hold', (e) => this.onHold())
            .on('unhold', (e) => this.onUnhold())
            .on('ended', (e) => this.onEnded(e))
            .on('update', (e) => this.onUpdate());

        if (this._session.connection) {
            this.onPeerConection();
        }
    }

    onConnecting() {

        if (this._session.connection.getSenders().length > 0) {
            this._localStream = this._session.connection.getSenders()[0];
        }
    }
    onPeerConection() {
        this._session.connection.addEventListener('addstream', (e) => this.onStreamAdded(e));
    }


    onProgress() {
        this.status.next('ringing');
    }

    onAccepted(e: any) {
        console.log('Call accepted');
        this.status.next('active');
        this.inTalkStatus.next('talking');

        if (this._session.connection.getSenders().length > 0) {
            this._localStream = this._session.connection.getSenders()[0];
        }

        if (e.originator === 'remote') {
            if (e.response.getHeader('X-Can-Renegotiate') === 'false') {
                this._session.data.remoteCanRenegotiateRTC = false;
            } else {
                this._session.data.remoteCanRenegotiateRTC = true;
            }
        }

    }

    onStreamAdded(e) {
        console.log('add stream')
        this.callOptions.outputStream(e.stream);
    }

    onDTMF(e) {
        this.dtmf.next({
            originator: e.originator,
            code: `${e.dtmf.tone}`,
        });
    }

    onHold() {
        this.inTalkStatus.next('hold');

    }

    onUnhold() {
        this.inTalkStatus.next('talking');
    }

    onFailed(e) {
        this.status.next('done');
        console.log('failed!', e);
    }

    onEnded(e) {
        console.log('ended?', e);
        this.muted.complete();
        this.status.next('done');
        if(this.callOptions.hasVideo){
            console.log('terminate video');
            this.callOptions.localVideo.srcObject.getVideoTracks()[0].stop();
            this.callOptions.remoteVideo.srcObject.getVideoTracks()[0].stop();
            this.callOptions.localVideo.src = '';
            this.callOptions.localVideo.srcObject = null;
            this.callOptions.remoteVideo.srcObject = null;
        }
        this.callOptions.close();
        // let startTime = this.moment(this.session.start_time);
        // let endTime = this.moment(this.session.end_time);
        // let duration = this.moment.duration(endTime.diff(startTime));
        // this.duration = this.moment.utc(duration.asMilliseconds()).format("mm:ss");


        JSSIPUtils.closeMediaStream(this._localStream);
    }

    onUpdate() {
        console.log('on updated');
        this.status.next('done');
    }

    hangup() {
        this._session.terminate();
    }

    answer() {
        this._session.answer(this.answerOptions);
    }

    hold() {
        this._session.hold();
    }

    unhold() {
        this._session.unhold();
    }

    mute() {
        this.muted.next(true);
        this._session.mute();
    }

    unmute() {
        this.muted.next(false);
        this._session.unmute();
    }

    sendDTMF(d: string) {
        this._session.sendDTMF(d);
    }

}


