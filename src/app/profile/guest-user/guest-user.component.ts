import { Component, OnInit } from '@angular/core';
import {LoadMe, UserActionTypes} from '../../user.actions';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../core/User.interface';
import {UserState} from '../../user.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.sass']
})
export class GuestUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: Store<UserState>,
  ) { }

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

  connect(id) {
    this.store.dispatch({type: UserActionTypes.ConnectWithUser, payload: id});
  }

  disconnect(id) {
    this.store.dispatch({type: UserActionTypes.DisconnectWithUser, payload: id});
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
