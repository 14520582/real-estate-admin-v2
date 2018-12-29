import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../common/api';
import { Utils } from '../common/core-utils';

@Injectable()
export class PriceService {
    constructor(    
        private http: HttpClient
    ) {

    }
    getMarketPrice(): Observable<any[]> {
        return this.http.get<any[]>(API.API_PRICE + '/get/all');
    }
    update(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Token': Utils.getCurrentToken()
            })
          };
        return this.http.put<any>(API.API_PRICE + '/update', body, httpOptions);
    }
}
