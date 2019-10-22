import { MatSnackBar } from '@angular/material';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, concatMap, switchMap} from 'rxjs/operators';
import {EMPTY, throwError} from 'rxjs';
import {
  UserActionTypes,
  UserActions,
  LoginSuccess,
  LogoutSuccess,
  LoadMeSuccess,
  ConnectWithUserSuccess,
  DisconnectWithUserSuccess, RestorePasswodSuccess, LoadChatsSuccess
} from './user.actions';
import {AuthService} from './core/services/auth.service';
import {of} from 'rxjs/internal/observable/of';
import {UserService} from './core/services/user.service';
import {User} from './core/User.interface';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadRoomsSuccess, RoomActionTypes, RoomsActions} from './rooms.actions';
import {Room} from './rooms.reducer';


@Injectable()
export class UserEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(UserActionTypes.Login),
    switchMap((action: any) => this.auth.signIn(action.payload).pipe(
      switchMap(res => {
        this.auth.setToken(res.jwt);
        this.router.navigate(['feed']);
        return of(new LoginSuccess(res));
      }),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
    )),
    catchError(() => of({type: UserActionTypes.LoadMeError}))
  );

  @Effect()
  uploadPhoto$ = this.actions$.pipe(
    ofType(UserActionTypes.UploadPhoto),
    switchMap((action: any) => this.user.uploadPhoto(action.payload).pipe(
      switchMap((res: any) => of({type: UserActionTypes.UploadPhotoSuccess, payload: res.data})),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
    ))
  );

  @Effect()
  loadMe$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadMe),
    switchMap(() => this.user.getMe().pipe(
        switchMap((res: User) => of({type: UserActionTypes.LoadMeSuccess, payload: res})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  loadInterests$ = this.actions$.pipe(
    ofType(UserActionTypes.GetInterests),
    switchMap(() => this.user.getInterests().pipe(
      switchMap((res: any) => of({type: UserActionTypes.GetInterestsSuccess, payload: res.data})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUser),
    switchMap(({payload}) => this.user.getOne(payload).pipe(
        switchMap((res: User) => of({type: UserActionTypes.LoadUserSuccess, payload: res})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  updateMe$ = this.actions$.pipe(
    ofType(UserActionTypes.UpdateMe),
    switchMap(({ payload }) => this.user.setMe(payload)
      .pipe(
        switchMap((res: User) => of({type: UserActionTypes.UpdateMeSuccess, payload: res})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  blockUser$ = this.actions$.pipe(
    ofType(UserActionTypes.BlockUser),
    switchMap(({ payload }) => this.user.blockUser(payload)
      .pipe(
        switchMap(() => of({type: UserActionTypes.BlockUserSuccess})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  blockUserSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.UnBlockUser),
    switchMap(({ payload }) => this.user.blockUser(payload)
      .pipe(
        switchMap(() => of({type: UserActionTypes.UnBlockUserSuccess})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      ))
  );

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap(() => this.user.getList().pipe(
        switchMap((res: User[]) => of({type: UserActionTypes.LoadUsersSuccess, payload: res})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      )),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
  );

  @Effect()
  setMain$ = this.actions$.pipe(
    ofType(UserActionTypes.SetMain),
    switchMap(({payload}) => this.user.setMain(payload).pipe(
        switchMap((res: any) => of({type: UserActionTypes.SetMainSuccess, payload: res.data})),
        catchError(() => {
          this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
          return of({type: UserActionTypes.LoadMeError})
        })
      )),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(UserActionTypes.Logout),
    switchMap((action: any) => {
      this.auth.logout();
      this.router.navigate(['login']);
      return of(new LogoutSuccess());
    }),
    catchError(() => {
      this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
      return of({type: UserActionTypes.LoadMeError})
    })
  );

  @Effect()
  connectWithUser$ = this.actions$.pipe(
    ofType(UserActionTypes.ConnectWithUser),
    switchMap(({payload}) => this.user.connectWithUser(payload).pipe(
      switchMap(() => of(new ConnectWithUserSuccess())),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
    )),
    catchError(() => {
      this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
      return of({type: UserActionTypes.LoadMeError})
    })
  );

  @Effect()
  disconnectWithUser$ = this.actions$.pipe(
    ofType(UserActionTypes.DisconnectWithUser),
    switchMap(({payload}) => this.user.disconnectWithUser(payload).pipe(
      switchMap(() => of(new DisconnectWithUserSuccess()))
    )),
    catchError(() => {
      this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
      return of({type: UserActionTypes.LoadMeError})
    })
  );

  @Effect()
  resetPw$ = this.actions$.pipe(
    ofType(UserActionTypes.Restore),
    switchMap(({payload}) => this.user.resetPw(payload).pipe(
      switchMap(() => of(new RestorePasswodSuccess())),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
    )),
    catchError(() => {
      this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
      return of({type: UserActionTypes.LoadMeError})
    })
  );

  @Effect()
  getChats$ = this.actions$.pipe(
    ofType(RoomActionTypes.LoadRooms),
    switchMap(() => this.user.getChats().pipe(
      switchMap((res: {data: Room[]}) => {
        return of({type: RoomActionTypes.LoadRoomsSuccess, payload: res.data});
      }),
      catchError(() => {
        this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
        return of({type: UserActionTypes.LoadMeError})
      })
    )),
    catchError(() => {
      this.snackBar.open("Error occured... Please, reload the page", 'Close', {horizontalPosition: 'start', duration: 25 * 1000});
      return of({type: UserActionTypes.LoadMeError})
    })
  );

  constructor(private actions$: Actions<UserActions>,
              private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private user: UserService) {
  }

}
