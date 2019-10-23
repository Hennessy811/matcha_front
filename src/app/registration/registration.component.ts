import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/User.interface';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService,    private snackBar: MatSnackBar,
  ) {
  }

  username = new FormControl('');
  fname = new FormControl('');
  lname = new FormControl('');
  mail = new FormControl('');
  password = new FormControl('');
  passwordConfirmation = new FormControl('');
  age = new FormControl('');
  gender = new FormControl('');

  genderList: string[] = [
    'male',
    'female',
  ];

  onSignUp() {
    const user: User = {
      username: this.username.value,
      email: this.mail.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value,
      fname: this.fname.value,
      lname: this.lname.value,
      age: this.age.value,
      gender: this.gender.value,
    };

    this.auth.signUp(user).subscribe(res => {
      // console.log(res)
      this.snackBar.open(res.ok.detail || res.error.detail, 'Close', {horizontalPosition: 'start', duration: 5 * 1000});
    });
  }

  ngOnInit() {
  }

  checkValid() {
    return this.username.value &&
      this.fname.value &&
      this.lname.value &&
      this.mail.value &&
      this.password.value &&
      this.age.value &&
      this.gender.value &&
      this.passwordConfirmation.value === this.password.value;
  }
}
