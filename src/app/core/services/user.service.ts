import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from 'rxjs';
import {log} from 'util';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getMe(): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${environment.baseURL}me`, httpOptions)
  }

  setMe(props) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(`${environment.baseURL}me`, {user: props}, httpOptions);
  }

  resetPw(props) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${environment.baseURL}reset_password`, props, httpOptions);
  }

  connectWithUser(id) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(`${environment.baseURL}subscribe/${id}`, {}, httpOptions);
  }

  disconnectWithUser(id) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(`${environment.baseURL}unsubscribe/${id}`, {}, httpOptions);
  }

  getList() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${environment.baseURL}users`, httpOptions);
  }

  getChats() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${environment.baseURL}me/rooms`, httpOptions);
  }

  getOne(id) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${environment.baseURL}users/${id}`, httpOptions);
  }

  setMain(id) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post(`${environment.baseURL}photos/${id}`, {},  httpOptions);
  }

  uploadPhoto(photo: string) {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post(`${environment.baseURL}photos`, {
      photos: [photo]
    }, httpOptions);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
