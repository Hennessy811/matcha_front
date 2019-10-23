import { Component, OnInit } from '@angular/core';
import {LoadMe, UserActionTypes} from '../../user.actions';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../core/User.interface';
import {UserState} from '../../user.reducer';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {store} from '@angular/core/src/render3';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.sass']
})
export class GuestUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<UserState>,
  ) { }

  me$: Observable<User> = this.store.select(state => state.user.profile);
  profile$: Observable<User> = this.store.select(state => state.user.viewProfile);
  allPhotos$ = this.store.select(state => state.user.viewProfile.photos.filter(item => !item.is_main));
  avatar$ = this.store.select(state => state.user.viewProfile.photos.find(item => item.is_main));

  isSubscriber$: Observable<boolean> = this.store.select(state => {
    if (state.user.profile) {
      const me = state.user.profile.id;
      return !!state.user.viewProfile.subscribers.find(item => item.id === me);
    }
    return false;
  });

  isSubscribedOnMe$: Observable<boolean> = this.store.select(state => {
    if (state.user.profile) {
      const me = state.user.profile.id;
      return !!state.user.viewProfile.subscriptions.find(item => item.id === me)
    }
    return false;
  });

  getIsBlocked(me: User, id) {
    // console.log(me.blocklist.find(item => item.id === id));
    return !!me.blocklist.find(item => item.id === id);
  }

  connect(id) {
    this.store.dispatch({type: UserActionTypes.ConnectWithUser, payload: id});
  }

  disconnect(id) {
    this.store.dispatch({type: UserActionTypes.DisconnectWithUser, payload: id});
  }

  report() {
    this.snackBar.open("Reported", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
  }

  block(id) {
    this.store.dispatch({type: UserActionTypes.BlockUser, payload: id})
    this.snackBar.open("Blocked", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
  }

  unblock(id) {
    this.store.dispatch({type: UserActionTypes.UnBlockUser, payload: id})
    this.snackBar.open("Unblocked", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      const {id} = res;

      if (id) {
        this.store.dispatch({type: UserActionTypes.LoadUser, payload: id});
      }
    }).unsubscribe();
  }

}
