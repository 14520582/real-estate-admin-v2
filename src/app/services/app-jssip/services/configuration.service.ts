import { Injectable } from '@angular/core';
import { WebSocketInterface} from 'jssip';

@Injectable()
export class ConfigurationService {

    public wsuri: string;
    public sipuri: string;
    public password: string;
    public autoconnect = false;
    public autosave = false;
    public remoteVideo: HTMLVideoElement;
    public localVideo: HTMLVideoElement;
    private _stuns: string[] = [];

    constructor() {
    }

    _generateSocket() {
        console.log(this.wsuri);
        if (!this.wsuri) {
            throw new Error('Host not defined');
        }
        return new WebSocketInterface(this.wsuri);
    }

    getConfiguration() {
        if (!this._isValid) {
            throw new Error('SIP Configuration not loaded');
        }
        return {
            sockets: [this._generateSocket()],
            uri: this.sipuri,
            password: this.password,
            autoConnect: false,
            register: true,
            register_expires: 600,
            session_timers: false,
            connection_recovery_min_interval: 2,
            connection_recovery_max_interval: 30,
            registrar_server: '',
            no_answer_timeout: 60,
            use_preloaded_route: false,
            hack_via_tcp: false,
            hack_via_ws: false,
            hack_ip_in_contact: false
        };
    }

    get stuns() {
        return  this._stuns.join('\n');
    }

    set stuns(stuns) {

        this._stuns = stuns.split('\n').filter(s => s !== '');
    }

    getPcConfig() {
        return { 'iceServers': [ {'urls': this._stuns} ], 'gatheringTimeout': 2000, 'rtcpMuxPolicy': 'negotiate' };
    }

    private _isValid() {
         return this.wsuri != null && this.sipuri != null && this.password != null;
    }

}
