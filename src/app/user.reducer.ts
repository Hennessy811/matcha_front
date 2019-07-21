import {UserActions, UserActionTypes} from './user.actions';
import {User} from './core/User.interface';

export interface State {
  isLoggedIn: boolean;
  profile: User;
  feed: User[];
  filterFeed: User[];
}

export const initialState: State = {
  isLoggedIn: true,
  profile: null,
  feed: null,
  filterFeed: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.SortUsersDistance: {
      let [...newFeed] = state.filterFeed;
      newFeed.sort((a: User, b: User) => {
        let coordsA = a.location.coordinates;
        let coordsB = b.location.coordinates;
        let distA = Math.sqrt(coordsA[0] * coordsA[0] + coordsA[1] * coordsA[1]);
        let distB = Math.sqrt(coordsB[0] * coordsB[0] + coordsB[1] * coordsB[1]);
        return distA - distB;
      });
        return {
          ...state,
          // @ts-ignore
          filterFeed: newFeed
        };
      }

    case UserActionTypes.SortUsersAge: {
      let [...newFeed] = state.filterFeed;
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
      for(let i = 0; i < state.feed.length; i++) {
        let userCoords = state.profile.location.coordinates;
        let coords = state.feed[i].location.coordinates;
        let x = userCoords[0] - coords[0];
        let y = userCoords[1] - coords[1];
        let dist = Math.sqrt(x * x + y * y);
        if (
          dist <= action.payload["radius"] &&
          state.feed[i].age >= action.payload["ageFrom"] &&
          state.feed[i].age <= action.payload["ageTo"]) {
            console.log(dist, action.payload["radius"])
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
        // @ts-ignore
        feed: action.payload.data,
        filterFeed: action.payload.data
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
      };

    default:
      return state;
  }
}
