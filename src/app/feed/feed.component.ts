import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service';
import {Store} from '@ngrx/store';
import {LoadUsers, FilterUsers, SortUsersAge, LoadMe,
  SortUsersDistance} from '../user.actions';
import {User} from '../core/User.interface';
import {Observable} from 'rxjs';
import getDistance from 'geolib/es/getDistance';
import {UserState} from '../user.reducer';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  constructor(private users: UserService,
              private store: Store<UserState>) { }

  profiles$: Observable<User[]> = this.store.select(state => state.user.filterFeed);
  me$: Observable<User> = this.store.select(state => state.user.profile);
  isLoggedIn$: Observable<boolean> = this.store.select(state => state.user.isLoggedIn);

  minFrom = 18;
  maxTo = 118;
  thumbLabel = true;
  step = 1;
  ageFrom = 18;
  ageTo = 118;
  radius = 15000;
  frate = 0;
  showSettings = false;
  sorted: string = null;
  sortedList: string[] = ['age', 'distance', 'tag', 'frate'];

  myCoords = null;
  // ageSort: boolean = false;

  ngOnInit() {
    this.isLoggedIn$.subscribe(res => {
      if (res) {
        this.store.dispatch(new LoadUsers());
      }
    }).unsubscribe();

    this.me$.subscribe(res => {
      if (res) {
        this.myCoords = {
          lat: res.location.coordinates[1],
          lon: res.location.coordinates[0],
        };
      }
    });
  }

  getDistanceFromMe(coords) {
    if (!this.myCoords) { return ''; }
    return Math.round(getDistance({
      lat: coords[1],
      lon: coords[0]
    }, this.myCoords) / 10) / 100;
  }

  filter() {
    this.store.dispatch(new FilterUsers({
      ageFrom: this.ageFrom,
      ageTo: this.ageTo,
      radius: this.radius * 1000,
      frate: this.frate
    }));
    // if (this.sorted) {
    this.sort();
    // }
  }

  sort() {
    // console.log(this.sorted);
    if (this.sorted === this.sortedList[0]) {
      this.store.dispatch(new SortUsersAge());
    } else if (this.sorted === this.sortedList[1]) {
      this.store.dispatch(new SortUsersDistance());
    } else if (this.sorted === this.sortedList[3]) {
      this.store.dispatch(new SortUsersDistance());
    }
    // if (this.ageSort)
  }

  getOne() {
    this.users.getOne(11).subscribe(user => console.log(user));
  }

}
