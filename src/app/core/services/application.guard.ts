import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {CanActivate} from "@angular/router";

@Injectable()
export class ApplicationGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.user.isLoggedIn)
  }
}
