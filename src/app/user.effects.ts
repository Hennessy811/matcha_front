import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {concatMap, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {UserActionTypes, UserActions, LoginSuccess, LogoutSuccess, LoadMeSuccess} from './user.actions';
import {AuthService} from "./core/services/auth.service";
import {of} from "rxjs/internal/observable/of";
import {UserService} from "./core/services/user.service";
import {User} from "./core/User.interface";


@Injectable()
export class UserEffects {


  @Effect()
  login$ = this.actions$.pipe(
    ofType(UserActionTypes.Login),
    switchMap((action: any) => this.auth.signIn(action.payload).pipe(
      switchMap(res => {
        this.auth.setToken(res.jwt);
        return of(new LoginSuccess(res))
      })
    ))
  );

  @Effect()
  loadMe$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadMe),
    switchMap(() => this.user.getMe().pipe(
        switchMap((res: User) => of({type: UserActionTypes.LoadMeSuccess, payload: res}))
      ))
  );

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap(() => this.user.getList.pipe(
        switchMap((res: User[]) => of({type: UserActionTypes.LoadUsersSuccess, payload: res}))
      ))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(UserActionTypes.Logout),
    switchMap((action: any) => {
      this.auth.logout()
      return of(new LogoutSuccess())
    })
  );


  constructor(private actions$: Actions<UserActions>,
              private auth: AuthService,
              private user: UserService) {
  }

}
