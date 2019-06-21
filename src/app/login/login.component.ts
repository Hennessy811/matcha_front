import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../user.reducer";
import { UserActionTypes, UserActions } from '../user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private store: Store<State>) { }

  ngOnInit() {
  }

  onSignIn() {
    const user = {
      "email": 'mitia2022@gmail.com',
      "password": 'foobar21'
    };

    this.store.dispatch({type: UserActionTypes.Login, payload: user});

    // this.auth.signIn(user).subscribe((res: any) => {
    //   this.auth.setToken(res.jwt);
    //   console.log(res)
    // })
  }

}
