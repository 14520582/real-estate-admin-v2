import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from '../common/core-utils';
import {API} from '../common/api';
import {CONSTANT} from '../common/constant';

@Injectable()
export class PendingService {
  constructor(
    private http: HttpClient,
  ) {
  }
  delete(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.delete<any>(API.API_PENDING + '/delete/' + id, httpOptions);
  }
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(API.API_PENDING + '/get');
  }
}
