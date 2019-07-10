import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadMe, UserActionTypes} from "../user.actions";
import {Observable} from "rxjs";
import {User} from "../core/User.interface";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

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

  profile$: Observable<User>;
  
  fullName: string;
  fname: string;
  lname: string;
  mail: string;
  username: string;
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
  newTag: string;
  interests: string[];
  
  constructor(
    private user: UserService,
    private store: Store<any>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
          'edit',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
      iconRegistry.addSvgIcon(
          'save',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/checked.svg'));
    }

  ngOnInit() {
    this.ages = Array(100).fill(0).map((x,i)=>i);
    this.store.dispatch(new LoadMe());
    this.profile$ = this.store.select(state => state.user.profile);
    this.profile$.subscribe((val) => console.log(val));
      this.profile$.subscribe((val) => {
        if (val) {
          this.fname = val.fname;
          this.lname = val.lname;
          this.age = val.age;
          this.biography = val.biography;
          this.mail = val.email;
          this.username = val.username;
          this.gender = val.gender;
          this.preferences = val.preferences;
          this.getFullName();
        }
      });
  }

  setMe() {
    console.log(this.profile$);
    let user = {
      "biography": "I'm really really very cool!"
    };

    // this.user.setMe(user).subscribe((user: User) => this.info = user)
  }

  getFullName() {
    let fullName = this.fname + " " + this.lname;
    this.fullName = fullName;
    return fullName;
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

  sendData() {
    console.log({
      "age": this.age,
      "biography": this.biography,
      "gender": this.gender,
      "preferences": this.preferences,
      "interests": this.interests,
    });
  }
}
