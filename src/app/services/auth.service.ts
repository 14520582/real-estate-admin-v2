import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { API } from '../common/api'

@Injectable()
export class AuthService {
  public logged = new BehaviorSubject(false); 
  constructor(
    private http: HttpClient
  ) {
  }
  login(username: string, password: string){
    const body = {
      "username": username,
      "password": password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(API.SERVER + 'login', body, httpOptions);

  }

  logout() {
    localStorage.clear();
  }
  editProfile(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Token': this.token
      })
    };
    return this.http.put<any>(API.API_ACCOUNT + '/update', user, httpOptions)
  }
  register(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(API.API_ACCOUNT + '/register', user, httpOptions)
  }
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Token': this.token
      })
    };
    return this.http.put<any>(API.API_ACCOUNT + 'changepassword?id=' + id + '&oldpassword=' + oldPassword + '&newpassword=' + newPassword, null, httpOptions)
  }
}
