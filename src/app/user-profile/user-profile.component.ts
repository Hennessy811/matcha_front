import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadMe, UserActionTypes} from "../user.actions";
import {Observable} from "rxjs";
import {User} from "../core/User.interface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<User> = this.store.select(state => state.user.profile);

  constructor(private user: UserService,
              private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new LoadMe());
  }

  setMe() {
    let user = {
      "biography": "I'm really really very cool!"
    };

    // this.user.setMe(user).subscribe((user: User) => this.info = user)
  }

}
