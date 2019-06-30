import {UserActions, UserActionTypes} from './user.actions';
import {User} from "./core/User.interface";

export interface State {
  isLoggedIn: boolean;
  profile: User;
  feed: User[];
}

export const initialState: State = {
  isLoggedIn: true,
  profile: null,
  feed: null
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        // @ts-ignore
        feed: action.payload.data
      };

    case UserActionTypes.LoginSuccess:
      return {
        ...state,
        isLoggedIn: true
      };

    case UserActionTypes.LogoutSuccess:
      return {
        ...state,
        isLoggedIn: false
      };

    case UserActionTypes.LoadMeSuccess:
      return {
        ...state,
        profile: action.payload.data
      }

    default:
      return state;
  }
}
