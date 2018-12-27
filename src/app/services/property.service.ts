import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { API } from '../common/api';
import { CONSTANT } from '../common/constant';

@Injectable()
export class PropertyService {
  userId: number;
  constructor(
    private http: HttpClient,
  ) {
  }
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(API.API_PROPERTY + '/get/new?limit='+ CONSTANT.CAROUSEL_SIZE);
  }
  getNewList(limit: number): Observable<any[]> {
    return this.http.get<any[]>(API.API_PROPERTY + '/get/new?limit='+limit);
  }
  getByDistrictAndForm(district: string, form: number): Observable<any[]> {
    return this.http.get<any[]>(API.API_PROPERTY + '/get/' + district + '/' + form);
  }
  filter(content: string, page: number): Observable<any> {
    return this.http.get<any>(API.API_PROPERTY + '/get/filter?page=' + page + '&pagesize=' + CONSTANT.PAGE_SIZE_FILTER + '&content=' + content);
  }
  upTown(page: number): Observable<any> {
    return this.http.get<any>(API.API_PROPERTY + '/get/uptown?page=' + page + '&pagesize=' + CONSTANT.PAGE_SIZE_FILTER);
  }
  downTown(page: number): Observable<any> {
    return this.http.get<any>(API.API_PROPERTY + '/get/downtown?page=' + page + '&pagesize=' + CONSTANT.PAGE_SIZE_FILTER);
  }
  getDistrictByCity(city: number): Observable<any[]>  {
    return this.http.get<any[]>(API.SERVER + 'district/get/' + city);
  }
  getWardByDistrict(district: number): Observable<any[]>  {
    return this.http.get<any[]>(API.SERVER + 'district/get/ward/' + district);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(API.API_PROPERTY + '/get/' + id);
  }
  getUserBased(id: number): Observable<any[]> {
    return this.http.get<any[]>(API.API_PROPERTY + '/get/userbased/' + id);
  }
  getItemBased(id: number): Observable<any[]> {
    return this.http.get<any[]>(API.API_PROPERTY + '/get/itembased/' + id);
  }
  getLatLngFromAddress(address): Observable<any> {
    return this.http.get<any>('https://geocoder.api.here.com/6.2/geocode.json?app_id=EXq3zklggymY23uZCbg1&app_code=kNhjc_eLWbVcfulbhBY_xQ&searchtext=' + address);
  }
}
