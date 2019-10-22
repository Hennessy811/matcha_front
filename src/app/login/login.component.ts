import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {State, UserState} from '../user.reducer';
import { UserActionTypes } from '../user.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private store: Store<UserState>) { }

  login = new FormControl('');
  pass = new FormControl('');

  onSignIn() {
    const user = {
      email: this.login.value,
      password: this.pass.value
    };
    this.store.dispatch({type: UserActionTypes.Login, payload: user});
  }

}
