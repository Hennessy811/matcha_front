import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Socket} from 'phoenix';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {UserState} from '../../user.reducer';
import {UserActionTypes} from '../../user.actions';
import {RoomActionTypes, RoomsActions} from '../../rooms.actions';
import {Subject} from 'rxjs';
import {ChatRoom, Message, Room} from '../../rooms.reducer';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(
    private snackBar: MatSnackBar,
    private store: Store<UserState>,
  ) {
    this.joined.next(false);
  }

  token;
  socket;

  activeChat;
  activeChatId;

  history = new Subject<Message[]>();
  joined = new Subject<boolean>();

  openSnackBar(message = 'New message!') {
    this.snackBar.open(message, 'Close', {horizontalPosition: 'start', duration: 5 * 1000});
  }

  public connect(id) {
    this.token = localStorage.getItem('token');
    this.socket = new Socket(`${environment.socketURL}`, {params: {token: this.token}});
    this.socket.connect();

    const channel = this.socket.channel(`notification:${id}`, {
      token: this.token
    });

    channel
      .join()
      .receive('ok', resp => {
        // this.openSnackBar('Joined successfully');
      })
      .receive('error', resp => {
        this.openSnackBar('Unable to load something important, please, reload the page... :(');
      });

    channel.on('new_message', payload => {
      this.openSnackBar('You got new message!');
    });

    channel.on('new_viewer', payload => {
      this.openSnackBar('Your profile has been viewed by new user!');

    });

    channel.on('new_subscriber', payload => {
      this.openSnackBar('You have one new subscriber');

    });

    channel.on('new_connection', payload => {
      this.store.dispatch({type: UserActionTypes.ConnectByUser, payload: payload.id});
      this.openSnackBar('New connection with user ' + payload.username);
    });

    channel.on('lost_connection', payload => {
      this.store.dispatch({type: UserActionTypes.DisconnectByUser, payload: payload.id});
      this.openSnackBar('Lost connection with user ' + payload.username);
    });

    channel.on('new_message', payload => {
      this.openSnackBar('You have new message!');

    });
  }

  public joinRoom(id) {
    this.activeChatId = id;

    if (!this.socket) return;
    this.activeChat = this.socket.channel(`room:${id}`, {
      token: this.token
    });

    this.activeChat
      .join()
      .receive('ok', (payload: ChatRoom) => {
        // console.log(payload);
        this.history.next(payload.messages);
        this.joined.next(true);
        // this.openSnackBar('Chat joied');
      })
      .receive('error', resp => {
        this.joined.next(false);
        this.openSnackBar('Error occurred');
      });

    this.activeChat.on('message_created', payload => {
      this.history.next(payload.messages);
      // this.openSnackBar('New message in chat!');
    });
  }

  public send(str) {
    this.activeChat
      .push('new_message', {
        text: str,
        chat_id: this.activeChatId
      });
  }

  public getHistory(): Subject<Message[]> {
    return this.history;
  }

  public getActiveChatId() {
    return this.activeChatId;
  }

  public getIsJoined(): Subject<boolean> {
    return this.joined;
  }
}
