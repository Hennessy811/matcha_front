import { Action } from '@ngrx/store';
import {User} from "./core/User.interface";

export enum UserActionTypes {
  SortUsersDistance = '[User] Sort Users Distance',
  SortUsersAge = '[User] Sort Users Age',
  FilterUsers = '[User] Filter Users',
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUser = '[User] Load User',
  LoadMe = '[User] Load Me',
  LoadMeSuccess = '[User] Load Me Success',
  UpdateMe = '[User] Update Me',
  Login = '[User] Login',
  LoginSuccess = '[User] Login Success',
  Logout = '[User] Logout',
  LogoutSuccess = '[User] Logout Success',
  SignUp = '[User] Sign Up'
}

export class SortUsersDistance implements Action {
  readonly type = UserActionTypes.SortUsersDistance;
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

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
}

export class LoadMe implements Action {
  readonly type = UserActionTypes.LoadMe;
}

export class LoadMeSuccess implements Action {
  [x: string]: any;
  readonly type = UserActionTypes.LoadMeSuccess;
  constructor(payload: User) {}
}

export class UpdateMe implements Action {
  readonly type = UserActionTypes.UpdateMe;
  constructor(payload: string) {}
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


export type UserActions = 
  | SortUsersDistance
  | SortUsersAge
  | FilterUsers
  | LoadUsers
  | LoadUser
  | LoadUsersSuccess
  | LoadMe
  | LoadMeSuccess
  | UpdateMe
  | Login
  | LoginSuccess
  | Logout
  | LogoutSuccess
  | SignUp;
