import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
@Injectable()
export class LocalStorageService {


    constructor() {
        localforage.config({
            driver: localforage.LOCALSTORAGE,
            name: 'jssip',
            version: 1.0,
            storeName: 'configuration'
        });
    }

    public clearAll() {
        return fromPromise(localforage.clear());
    }

  /**
   *
   * @param key
   * @param value
   * @returns {any}
   */
  public setItem<T>(key: string, value: T): Observable<T> {
    return fromPromise(localforage.setItem(key, value));
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public getItem<T>(key: string): Observable<T> {
    return fromPromise(localforage.getItem(key));
  }

  /**
   *
   * @param key
   * @param value
   * @returns {any}
   */
  public removeItem(key: string): Observable<void> {
    return fromPromise(localforage.removeItem(key));
  }

}
