import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserActionTypes} from '../user.actions';
import {Store} from '@ngrx/store';
import {UserState} from '../user.reducer';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {

  login = new FormControl('mitia2022@gmail.com');

  constructor(private store: Store<UserState>) { }

  ngOnInit() {
  }


  onRestore() {
    const user = {
      email: this.login.value,
    };
    this.store.dispatch({type: UserActionTypes.Restore, payload: user});
  }
}
