import { Action } from '@ngrx/store';
import {User} from "./core/User.interface";

export enum UserActionTypes {
  Restore = 'Restore PW',
  RestoreSuccess = 'Restore PWSuccess',
  SortUsersDistance = '[User] Sort Users Distance',
  SortUsersFrate = '[User] Sort Users Frate',
  SortUsersAge = '[User] Sort Users Age',
  FilterUsers = '[User] Filter Users',
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadMe = '[User] Load Me',
  SetMain = '[User] Set main',
  SetMainSuccess = '[User] Set main success',
  LoadMeError = '[User] Load Me Error',
  LoadMeSuccess = '[User] Load Me Success',
  UpdateMe = '[User] Update Me',
  UploadPhoto = '[User] Upload Photo',
  UploadPhotoSuccess  = '[User] Upload Photo Success',
  UpdateMeSuccess = '[User] Update Me Success',
  Login = '[User] Login',
  LoginSuccess = '[User] Login Success',
  Logout = '[User] Logout',
  LogoutSuccess = '[User] Logout Success',
  SignUp = '[User] Sign Up',
  ConnectWithUser = '[User] Connect with user',
  ConnectWithUserSuccess = '[User] Connect with user success',
  DisconnectWithUser = '[User] Disconnect with user',
  DisconnectByUser = '[User] Disconnect by user',
  ConnectByUser = '[User] Connect by user',
  LoadChats = '[Chat] LoadChats',
  LoadChatsSuccess = '[Chat] LoadChatsSuccess',
  DisconnectWithUserSuccess = '[User] Disconnect with user success',
}

export class LoadChats implements Action {
  readonly type = UserActionTypes.LoadChats;
}

export class LoadChatsSuccess implements Action {
  readonly type = UserActionTypes.LoadChatsSuccess;
  payload: any;
  constructor(payload: any) {}
}

export class SortUsersDistance implements Action {
  readonly type = UserActionTypes.SortUsersDistance;
}

export class SortUsersFrate implements Action {
  readonly type = UserActionTypes.SortUsersFrate;
}

export class SortUsersAge implements Action {
  readonly type = UserActionTypes.SortUsersAge;
}

export class FilterUsers implements Action {
  readonly type = UserActionTypes.FilterUsers;
  payload: object;
  constructor(val: object) {
    this.payload = val;
  }
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  payload: any;
  constructor(payload: User[]) {}
}

export class RestorePasswod implements Action {
  readonly type = UserActionTypes.Restore;
  payload: any;
  constructor(payload: string) {}
}

export class RestorePasswodSuccess implements Action {
  readonly type = UserActionTypes.RestoreSuccess;
  // payload: any;
  // constructor(payload: ]) {}
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
  payload: any;
  constructor(payload: string | number) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LoadUserSuccess;
  payload: any;
  constructor(payload: User) {}
}

export class LoadMe implements Action {
  readonly type = UserActionTypes.LoadMe;
}

export class LoadMeError implements Action {
  readonly type = UserActionTypes.LoadMeError;
}

export class LoadMeSuccess implements Action {
  [x: string]: any;
  readonly type = UserActionTypes.LoadMeSuccess;
  constructor(payload: User) {}
}

export class UpdateMe implements Action {
  readonly type = UserActionTypes.UpdateMe;
  payload: any;
  constructor(payload: any) {}
}

export class UpdateMeSuccess implements Action {
  readonly type = UserActionTypes.UpdateMeSuccess;
  payload: any;
  constructor(payload: User) {}
}

export class UploadPhoto implements Action {
  readonly type = UserActionTypes.UploadPhoto;
  payload: string;
  constructor(payload: string) {}
}

export class SetMain implements Action {
  readonly type = UserActionTypes.SetMain;
  payload: any;
  constructor(payload: string | number) {}
}

export class SetMainSuccess implements Action {
  readonly type = UserActionTypes.SetMainSuccess;
  payload: any;
  constructor(payload: string | number) {}
}

export class UploadPhotoSuccess implements Action {
  readonly type = UserActionTypes.UploadPhotoSuccess;
  payload: any;
  constructor(payload: any) {}
}

export class Login implements Action {
  readonly type = UserActionTypes.Login;
  constructor(payload: {email: string, password: string}) {}
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LoginSuccess;
  constructor(token: string) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LogoutSuccess;
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SignUp;
  constructor(payload: User) {}
}

export class ConnectWithUser implements Action {
  readonly type = UserActionTypes.ConnectWithUser;
  payload: any;
  constructor(payload: string | number) {}
}

export class ConnectWithUserSuccess implements Action {
  readonly type = UserActionTypes.ConnectWithUserSuccess;
}

export class DisconnectWithUser implements Action {
  readonly type = UserActionTypes.DisconnectWithUser;
  payload: any;
  constructor(payload: string | number) {}
}

export class DisconnectedByUser implements Action {
  readonly type = UserActionTypes.DisconnectByUser;
  payload: any;
  constructor(payload: string | number) {}
}

export class ConnectedByUser implements Action {
  readonly type = UserActionTypes.ConnectByUser;
  payload: any;
  constructor(payload: string | number) {}
}

export class DisconnectWithUserSuccess implements Action {
  readonly type = UserActionTypes.DisconnectWithUserSuccess;
}


export type UserActions =
  RestorePasswod
  | LoadChats
  | LoadChatsSuccess
  | RestorePasswodSuccess
  | SortUsersDistance
  | SortUsersFrate
  | SortUsersAge
  | FilterUsers
  | LoadUsers
  | LoadUser
  | LoadUserSuccess
  | LoadUsersSuccess
  | LoadMe
  | LoadMeError
  | LoadMeSuccess
  | UpdateMe
  | UpdateMeSuccess
  | UploadPhoto
  | UploadPhotoSuccess
  | SetMain
  | SetMainSuccess
  | Login
  | LoginSuccess
  | Logout
  | LogoutSuccess
  | ConnectWithUser
  | ConnectWithUserSuccess
  | DisconnectWithUser
  | DisconnectWithUserSuccess
  | ConnectedByUser
  | DisconnectedByUser
  | SignUp;
