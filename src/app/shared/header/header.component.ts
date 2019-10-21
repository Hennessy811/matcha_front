import { Component, OnInit } from '@angular/core';
import {GeolocationService} from '../../core/services/geolocation.service';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {UserActionTypes, Logout, LoadMe} from '../../user.actions';
import {Store} from '@ngrx/store';
import {UserState} from '../../user.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user$: Observable<boolean> = this.store.select(state => state.user.isLoggedIn);
  loading$: Observable<boolean> = this.store.select(state => state.user.isLoading);


  constructor(private getGeo: GeolocationService,
              private user: UserService,
              private auth: AuthService,
              private store: Store<UserState>) {
  }

  onLogout() {
    this.auth.logout();
    this.store.dispatch({type: UserActionTypes.Logout});
  }

  ngOnInit() {
    if (!this.user.isLoggedIn) { this.store.dispatch(new Logout()); }
    this.user$.subscribe(res => {
      if (res) {
        this.store.dispatch(new LoadMe()); // for usage user location in the store
      }
    })
    this.getGeo.setPosition();
  }

}
