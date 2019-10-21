import {RoomActionTypes, RoomsActions} from './rooms.actions';

export interface RoomsState {
  rooms: State;
}

export interface ChatRoom {
  messages: Message[];
  room: {
    id: number;
    users: {id: number | string, username: string}[]
  };
}
export interface Message {
  id: number | string;
  inserted_at: string;
  text: string;
  user: {id: number | string, username: string};
}

export interface Room {
  id: number | string;
  users: {
    id: number | string;
    username: string;
  }[];
}

export interface State {
  rooms: Room[];
  messages: any;
}

export const initialState: State = {
  rooms: [],
  messages: [],
};

export function reducer(state = initialState, action: RoomsActions): State {
  switch (action.type) {
    case RoomActionTypes.LoadRooms:
      return {
        ...state,
      };

    case RoomActionTypes.LoadRoomsSuccess:
      return {
        ...state,
        rooms: action.payload
      };

    case RoomActionTypes.GetMessages:
      return {
        ...state,
        messages: action.payload
      };

    default:
      return state;
  }
}
