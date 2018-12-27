import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'

import { CONSTANT } from '../common/constant'
import { DATA } from '../common/data'
import { API } from '../common/api'

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
    // return this.http.get<any>(Constant.SERVER + "news/get/page", { params: Params });
    return this.http.get<any>(API.API_NEWS + '/get/page' + '?page=' + page + '&pagesize=' + CONSTANT.PAGE_SIZE + '&category=' + category);
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
