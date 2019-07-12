import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadMe, UserActionTypes} from "../user.actions";
import {Observable} from "rxjs";
import {User} from "../core/User.interface";

export interface Food {
  value: string;
  viewValue: string;
}

interface StringMap { [key: string]: string; }

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<User>;
  
  ages: number[];
  genderList: string[] = [
    'male',
    'female',
  ];
  preferencesList: string[] = [
    'male',
    'female',
  ];
  newTag: string;
  interests: string[];
  
  constructor(
    private user: UserService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.ages = Array(100).fill(0).map((x,i)=>i);
    this.store.dispatch(new LoadMe());
    this.profile$ = this.store.select(state => state.user.profile);
  }

  setName(data: StringMap) {
    if (data['name']) {
      let name = data.name.split(" ");
      this.setMe({
          "fname": name[0],
          "lname": name[1]
        }
      );
    }
  }

  setMe(data: StringMap) {
    this.user.setMe(data).subscribe((user: User) => console.log(user));
    // this.user.setMe(user).subscribe((user: User) => this.info = user)
  }

  saveTag() {
    if(!this.interests) {
      this.interests = [];
    } 
    if (this.newTag && !this.interests.includes(this.newTag)) {
      this.interests.push(this.newTag);
    }
    this.newTag = "";
  }
}
