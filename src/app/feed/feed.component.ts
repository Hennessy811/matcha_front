import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadUsers, FilterUsers, SortUsersAge, LoadMe,
  SortUsersDistance} from "../user.actions";
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

  profiles$: Observable<User[]> = this.store.select(state => state.user.filterFeed)

  minFrom: number = 18;
  maxTo: number = 118;
  thumbLabel: boolean = true;
  step: number = 1;
  ageFrom: number = 18;
  ageTo: number = 118;
  radius: number = 100;
  showSettings: boolean = false;
  sorted: string = null;
  sortedList: string[] = ["age", "distance", "tag"]
  // ageSort: boolean = false;



  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.store.dispatch(new LoadMe()); // for usage user location in the store
    // this.users.getList.subscribe(users => console.log(users))
  }

  getDistance(coords) {
    let x = 37.6127488 - coords[0];
    let y = 55.757209599999996 - coords[1];
    let dist = Math.sqrt(x * x + y * y);
    return dist;
  }
  
  filter() {
    this.store.dispatch(new FilterUsers({
      "ageFrom": this.ageFrom,
      "ageTo": this.ageTo,
      "radius": this.radius,
    }));
    // if (this.sorted) {
      this.sort();
    // }
  }
  
  sort() {
    // console.log(this.sorted);
    if (this.sorted == this.sortedList[0]) {
      this.store.dispatch(new SortUsersAge());
    }
    else if (this.sorted == this.sortedList[1]) {
      this.store.dispatch(new SortUsersDistance());
    }
    // if (this.ageSort)
  }
  
  getOne() {
    this.users.getOne(3).subscribe(user => console.log(user));
  }

}
