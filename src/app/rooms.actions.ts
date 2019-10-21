import { Action } from '@ngrx/store';
import {Room} from './rooms.reducer';

export enum RoomActionTypes {
  LoadRooms = 'Load Rooms',
  LoadRoomsSuccess = 'Load RoomsSuccess',
  GetMessages = 'Get messages',
}

export class LoadRooms implements Action {
  readonly type = RoomActionTypes.LoadRooms;
}

export class LoadRoomsSuccess implements Action {
  readonly type = RoomActionTypes.LoadRoomsSuccess;
  payload: any;
  constructor(payload: Room[]) {}
}

export class GetMessages implements Action {
  readonly type = RoomActionTypes.GetMessages;
  payload: any;
  constructor(payload: any) {}
}


export type RoomsActions =
  LoadRooms
  | GetMessages
  | LoadRoomsSuccess;
