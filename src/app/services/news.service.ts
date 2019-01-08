import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'

import { CONSTANT } from '../common/constant'
import { DATA } from '../common/data'
import { API } from '../common/api'
import { Utils } from '../common/core-utils';

@Injectable()
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getNewsByPageAndCategory(category: string, page: number): Observable<any> {
    let Params = new HttpParams();
    Params = Params.append('page', page.toString());
    Params = Params.append('pagesize', CONSTANT.PAGE_SIZE.toString());
    Params = Params.append('category', category);
    return this.http.get<any>(API.API_NEWS + '/get/page' + '?page=' + page + '&pagesize=' + CONSTANT.PAGE_SIZE + '&category=' + category);
  }
  saveNews(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.post<any>(API.API_NEWS + '/add', body, httpOptions);
  }
  updateNews(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.put<any>(API.API_NEWS + '/update', body, httpOptions);
  }
  deleteNews(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.delete<any>(API.API_NEWS + '/delete/' + id, httpOptions);
  }
  deleteUnit(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.delete<any>(API.API_UNIT + '/delete/' + id, httpOptions);
  }
  saveUnit(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.post<any>(API.API_UNIT + '/add', body, httpOptions);
  }
  updateUnit(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': Utils.getCurrentToken()
      })
    };
    return this.http.put<any>(API.API_UNIT + '/update', body, httpOptions);
  }
  getTopics(): any[] {
    return DATA.TOPICS;
  }
  getNewsMostView(): Observable<any[]> {
    return this.http.get<any[]>(API.API_NEWS + '/get/mostview');
  }
  getNewsById(id: number): Observable<any> {
    return this.http.get<any>(API.API_NEWS + '/get/' + id);
  }
}
