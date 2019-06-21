import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadUsers} from "../user.actions";
import {User} from "../core/User.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  constructor(private users: UserService,
              private store: Store<any>) { }

  profiles$: Observable<User[]> = this.store.select(state => state.user.feed)

  ngOnInit() {
    this.store.dispatch(new LoadUsers())
    // this.users.getList.subscribe(users => console.log(users))
  }

  getOne() {
    this.users.getOne(3).subscribe(user => console.log(user));
  }

}
