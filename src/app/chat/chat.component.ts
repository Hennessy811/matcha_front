import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {SocketService} from '../core/services/socket.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Message, Room, RoomsState, State} from '../rooms.reducer';
import {LoadRooms, RoomActionTypes} from '../rooms.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private store: Store<RoomsState>,
    private socket: SocketService,
  ) { }

  message: string;
  activeChatId: string | number;
  rooms$: Observable<State> = this.store.select(state => state.rooms);
  //@ts-ignore
  me$: Observable<any> = this.store.select(state => state.user.profile.id);
  history: Subject<Message[]>;
  joined: Subject<boolean>;
  messages;

  ngOnInit() {
    this.store.dispatch({type: RoomActionTypes.GetMessages, payload: [{}]})
    this.history = this.socket.getHistory();
    this.joined = this.socket.getIsJoined();
    this.scrollToBottom();

    this.history.subscribe(history => {
      this.messages = history.sort((a, b) => new Date(a.inserted_at).getTime() - new Date(b.inserted_at).getTime());
      this.scrollToBottom();
    });

    this.store.dispatch(new LoadRooms());
    this.rooms$.subscribe(res => {
      if (res.rooms.length) {
        // TODO Chat selection
        this.socket.joinRoom(res.rooms[0].id);
      }
    });
  }

  findChatGuest(room: Room, me) {
    if (room && me) {
      console.log(room, me);
      return room.users.find(user => user.id !== me).username;
    }
    return '';
  }

  switchRoom(id) {
    console.log('beepboop');
  }

  send() {
    this.socket.send(this.message);
    this.message = '';
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnDestroy(): void {
    // this.history.unsubscribe();
    // this.joined.unsubscribe();
  }
}
