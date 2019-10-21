import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/User.interface';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  username = new FormControl('hennessy811');
  fname = new FormControl('Foo');
  lname = new FormControl('Bar');
  mail = new FormControl('mitia2022@gmail.com');
  password = new FormControl('foobar21');
  passwordConfirmation = new FormControl('foobar21');

  onSignUp() {
    const user: User = {
      username: this.username.value,
      email: this.mail.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value,
      fname: this.fname.value,
      lname: this.lname.value,
      age: 30,
      biography: 'I\'m very cool!',
      gender: 'male',
      preferences: 'female',
      interests: ['#sport', '#travel'],
      location: {type: 'Point', coordinates: [100, 30]}
    };

    this.auth.signUp(user).subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

  checkValid() {
    return this.username.value &&
      this.fname.value &&
      this.lname.value &&
      this.mail.value &&
      this.password.value &&
      this.passwordConfirmation.value === this.password.value;
  }
}
