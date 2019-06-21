import { Component, OnInit } from '@angular/core';
import {GeolocationService} from "../../core/services/geolocation.service";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {UserActionTypes, UserActions, Logout} from '../../user.actions';
import {Store} from "@ngrx/store";
import {State} from "../../user.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user$: Observable<any> = this.store.select(state => state.user.isLoggedIn);

  constructor(private getGeo: GeolocationService,
              private user: UserService,
              private auth: AuthService,
              private store: Store<any>) {
  }

  onLogout() {
    this.auth.logout();
    this.store.dispatch({type: UserActionTypes.Logout});
  }

  ngOnInit() {
    if (!this.user.isLoggedIn) this.store.dispatch(new Logout());
    this.getGeo.setPosition();
  }

}
