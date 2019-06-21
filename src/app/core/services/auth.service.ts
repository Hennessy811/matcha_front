import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../User.interface";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router) {
  }

  activate(token: string) {
    this.http.get(`${environment.baseURL}activate/${token}`)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/login'])
      })
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
