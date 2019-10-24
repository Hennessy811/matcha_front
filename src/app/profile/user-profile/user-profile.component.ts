import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { Store } from "@ngrx/store";
import {
  LoadMe,
  LoadUser,
  UpdateMe,
  UserActionTypes
} from "../../user.actions";
import { Observable, of } from "rxjs";
import { Photo, User } from "../../core/User.interface";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { UserState } from "../../user.reducer";
import { MatSnackBar } from "@angular/material";

interface StringMap {
  [key: string]: any;
}

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.sass"]
})
export class UserProfileComponent implements OnInit {
  fileToUpload: File = null;

  ages: number[];
  genderList: string[] = ["male", "female"];
  preferencesList: string[] = ["bisexual", "male", "female"];
  newTag: string;

  constructor(private snackBar: MatSnackBar, private store: Store<UserState>) {}

  profile$ = this.store.select(state => state.user.profile);
  tags$ = this.store.select(state => state.user.popularTags);
  allPhotos$ = this.store.select(state =>
    state.user.profile.photos.filter(item => !item.is_main)
  );
  avatar$ = this.store.select(state =>
    state.user.profile.photos.find(item => item.is_main)
  );

  suggestedTags;

  ngOnInit() {
    this.ages = Array(100)
      .fill(0)
      .map((x, i) => i);

    this.store.dispatch({ type: UserActionTypes.LoadMe });
    this.store.dispatch({ type: UserActionTypes.GetInterests });
  }

  setMain(id) {
    this.store.dispatch({ type: UserActionTypes.SetMain, payload: id });
  }

  async handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const photo = this.fileToUpload;
    if (!(photo.type === "image/jpeg" || photo.type === "image/png")) {
      alert("File type " + photo.type + " does not supported");
      return of(null);
    }
    if (photo.size > 5000000) {
      alert("Photo size is more than 5Mb");
      return of(null);
    }
    // @ts-ignore
    const b64: string = await this.toBase64(photo);
    this.store.dispatch({
      type: UserActionTypes.UploadPhoto,
      payload: b64.split(",")[1]
    });
  }

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  setName(data: StringMap) {
    if (data.name) {
      const name = data.name.split(" ");
      this.setMe({
        fname: name[0],
        lname: name[1]
      });
    }
  }

  setMe(data: StringMap) {
    // console.log(data);
    this.store.dispatch({ type: UserActionTypes.UpdateMe, payload: data });
  }

  onTagChange(event) {
    this.tags$
      .subscribe(tags => {
        this.suggestedTags = tags.filter(item =>
          item.toLowerCase().includes(event.toLowerCase())
        );
      })
      .unsubscribe();
    // console.log(this.suggestedTags);
  }

  saveTag() {
    const validInterestRegex = /(?:\s|^)#[a-z0-9\-\.\_]+(?:\s|$)/i;

    this.profile$
      .subscribe(res => {
        const { interests } = res;
        if (
          interests.map(item => item.slice(1)).includes(this.newTag) ||
          !this.newTag
        ) {
          return;
        }
        if (!this.newTag.match(validInterestRegex)) {
          this.snackBar.open("Invalid tag format.", "Close", {
            horizontalPosition: "start",
            duration: 5 * 1000
          });
          return;
        }

        interests.push(`${this.newTag}`);
        this.setMe({ interests });
      })
      .unsubscribe();
    this.newTag = "";
  }

  removeTag(tag: string) {
    this.profile$
      .subscribe(res => {
        const interests = res.interests.filter(item => item !== tag);
        this.setMe({ interests });
      })
      .unsubscribe();
  }
}
