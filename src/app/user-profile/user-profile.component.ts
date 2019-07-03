import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadMe, UserActionTypes} from "../user.actions";
import {Observable} from "rxjs";
import {User} from "../core/User.interface";
// import { FormControl } from '@angular/forms';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<User> = this.store.select(state => state.user.profile);
  showProfile: boolean = true;
  age: number;
  ages: number[];
  biography: string;
  gender: string;
  genderList: string[] = [
    'male',
    'female',
  ];
  preferences: string;
  preferencesList: string[] = [
    'male',
    'female',
  ];
  interests: string[];
  
  constructor(private user: UserService,
              private store: Store<any>) { }

  ngOnInit() {
    this.ages = Array(100).fill(0).map((x,i)=>i);
    this.showProfile = true;
    this.store.dispatch(new LoadMe());
    this.profile$.subscribe((val) => console.log(val));
  }

  setMe() {
    console.log(this.profile$);
    let user = {
      "biography": "I'm really really very cool!"
    };

    // this.user.setMe(user).subscribe((user: User) => this.info = user)
  }

  toggleEdit(event) {
    this.showProfile = !this.showProfile
    event.target.innerHTML = this.showProfile ? 'edit profile' : 'save change'
  }

  sendData() {
    console.log({
      "age": this.age + 18,
      "biography": this.biography,
      "gender": this.gender,
      "preferences": this.preferences,
      "interests": this.interests,
    });
  }
}
