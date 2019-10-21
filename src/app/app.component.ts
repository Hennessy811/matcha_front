import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {UserState} from './user.reducer';
import {SocketService} from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<UserState>,
    private socket: SocketService,
  ) {}

  user$: Observable<boolean> = this.store.select(state => state.user.isLoggedIn);
  id$: Observable<any> = this.store.select(state => state.user.profile ? state.user.profile.id : null);

  ngOnInit() {
    this.user$.subscribe(res => {
      this.id$.subscribe(id => {
        if (res && id) { this.socket.connect(id); }
      });
    });
  }
}
