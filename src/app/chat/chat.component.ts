import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {SocketService} from '../core/services/socket.service';
import {Observable} from 'rxjs';
import {Room, RoomsState} from '../rooms.reducer';
import {LoadRooms} from '../rooms.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  constructor(
    private store: Store<RoomsState>,
    private socket: SocketService,
  ) { }

  message: string;
  activeChatId: string | number;
  rooms$: Observable<any[]> = this.store.select(state => state.rooms)

  ngOnInit() {
    this.store.dispatch(new LoadRooms());
    this.rooms$.subscribe(res => {
      if (res.rooms.length) {
        this.socket.joinRoom(res.rooms[0].id);
      }
    });
  }

  send() {
    this.socket.send(this.message);
  }
}
