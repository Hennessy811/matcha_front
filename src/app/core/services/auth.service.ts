import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../User.interface";
import {Observable, of} from 'rxjs';
import {Router} from "@angular/router";
import {catchError, map, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient,
  private snackBar: MatSnackBar,
  private router: Router) {
  }

  activate(token: string) {
    this.http.get(`${environment.baseURL}activate/${token}`)
      .pipe(
        switchMap(item => {
          // console.log(item);
          return of(null);
        }),
        catchError(() => {
          this.snackBar.open('Error', 'Close', {horizontalPosition: 'start', duration: 5 * 1000});
          return of(null);
        })
      );
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${environment.baseURL}sign_in`, user)
  }

  signUp(user: User): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "*/*");
    headers.append("Host", "94.16.121.185:4000");

    return this.http.post(`${environment.baseURL}sign_up`, {
      'user': user
    }, {
      headers: headers
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
