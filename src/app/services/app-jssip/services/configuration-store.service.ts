import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

import { LocalStorageService } from './../../app-storage/services/localstorage.service';



@Injectable()
export class ConfigurationStoreService {

    private props = ['wsuri', 'sipuri', 'password', 'autoconnect', 'autosave', 'stuns', 'azurekeys'];

    constructor(
        private configuration: ConfigurationService,
        private localstorage: LocalStorageService
    ) {

    }

    saveConfiguration(): Observable<boolean> {
        return merge(
            ...this.props.map((prop) => {
                return this.localstorage.setItem(prop, this.configuration[prop]);
            })
        ).map(e => true);
    }


    applyConfiguration(): Observable<boolean> {
        return merge(
            ...this.props.map((prop) => {
                return this.localstorage
                        .getItem(prop)
                        .do(value => {
                            if (value != null) {
                                this.configuration[prop] = value;
                            }
                        });
            })
        ).map(e => true);
    }

    clear() {
        return merge(
            ...this.props.map((prop) => {
                return this.localstorage.removeItem(prop);
            })
        ).map(e => true);
    }

}
