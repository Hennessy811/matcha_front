import {UserActions, UserActionTypes} from './user.actions';
import {User} from './core/User.interface';
import getDistance from 'geolib/es/getDistance';

export interface UserState {
  user: State;
}

export interface State {
  isError: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  profile: User;
  feed: User[];
  filterFeed: User[];
  viewProfile: User;
}

export const initialState: State = {
  isError: false,
  isLoading: false,
  isLoggedIn: !!localStorage.getItem('token'),
  profile: null,
  feed: null,
  filterFeed: null,
  viewProfile: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.SortUsersDistance: {
      const [...newFeed] = state.filterFeed;
      newFeed.sort((a: User, b: User) => {
        const coordsA = a.location.coordinates;
        const coordsB = b.location.coordinates;
        const distA = Math.sqrt(coordsA[0] * coordsA[0] + coordsA[1] * coordsA[1]);
        const distB = Math.sqrt(coordsB[0] * coordsB[0] + coordsB[1] * coordsB[1]);
        return distA - distB;
      });
      return {
        ...state,
        // @ts-ignore
        filterFeed: newFeed
      };
    }

    case UserActionTypes.SortUsersAge: {
      const [...newFeed] = state.filterFeed;
      newFeed.sort((a: User, b: User) => {
        return a.age - b.age
      });
      return {
        ...state,
        // @ts-ignore
        filterFeed: newFeed
      };
      }

    case UserActionTypes.FilterUsers: {
      let newFeed = [];
      for (let i = 0; i < state.feed.length; i++) {
        const coords = state.profile.location.coordinates;
        const dist = getDistance({
          lat: coords[1],
          lon: coords[0]
        }, {
          lat: state.feed[i].location.coordinates[1],
          lon: state.feed[i].location.coordinates[0]
        });

        if (
          dist <= action.payload["radius"] &&
          state.feed[i].age >= action.payload["ageFrom"] &&
          state.feed[i].fame_rating >= action.payload['frate'] &&
          state.feed[i].age <= action.payload["ageTo"]) {
            newFeed.push(state.feed[i]);
          }
        }
      return {
        ...state,
        // @ts-ignore
        filterFeed: newFeed
      };
      }

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        feed: action.payload.data,
        filterFeed: action.payload.data
      };

    case UserActionTypes.Login:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.LoadChats:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.LoadChatsSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case UserActionTypes.LoginSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true
      };

    case UserActionTypes.LogoutSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: false
      };

    case UserActionTypes.Logout:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.LoadMeSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: action.payload.data
      };

    case UserActionTypes.LoadMe:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.UpdateMeSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: action.payload.data
      };

    case UserActionTypes.LoadMeError:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case UserActionTypes.LoadUserSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        viewProfile: action.payload.data
      };

    case UserActionTypes.LoadUser:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.UploadPhoto:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.UploadPhotoSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: {
          ...state.profile,
          photos: [...state.profile.photos.map(item => ({ ...item, is_main: false, })), ...action.payload]
        }
      };

    case UserActionTypes.SetMain:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.SetMainSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: {
          ...state.profile,
          photos: [...state.profile.photos.filter(item => item.id !== action.payload.id).map(item => ({
            ...item,
            is_main: false,
          })), action.payload]
        }
      };

    case UserActionTypes.ConnectWithUser:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.ConnectWithUserSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        viewProfile: {
          ...state.viewProfile,
          subscribers: [...state.viewProfile.subscribers, state.profile],
        }
      };

    case UserActionTypes.ConnectByUser:
      return {
        ...state,
        isLoading: false,
        isError: false,
        viewProfile: {
          ...state.viewProfile,
          subscriptions: [...state.viewProfile.subscriptions, state.profile],
        }
      };

    case UserActionTypes.DisconnectWithUser:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case UserActionTypes.DisconnectWithUserSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        viewProfile: {
          ...state.viewProfile,
          subscribers: state.viewProfile.subscribers.filter(item => item.id !== state.profile.id),
        }
      };

    case UserActionTypes.DisconnectByUser:
      return {
        ...state,
        viewProfile: {
          ...state.viewProfile,
          connected: false,
          subscriptions: state.viewProfile.subscriptions.filter(item => item.id !== state.profile.id),
        }
      };

    default:
      return state;
  }
}
