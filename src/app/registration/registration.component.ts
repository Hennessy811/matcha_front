import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {User} from "../core/User.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  onSignUp() {
    let user: User = {
      "username": 'hennessy811',
      "email": "mitia2022@gmail.com",
      "password": "foobar21",
      "password_confirmation": "foobar21",
      "fname": "Foo",
      "lname": "Bar",
      "age": 30,
      "biography": "I'm very cool!",
      "gender": "male",
      "preferences": "female",
      "interests": ["#sport", "#travel"],
      "location": {"type": "Point", "coordinates": [100, 30]}
    };

    this.auth.signUp(user).subscribe(res => console.log(res))
  }

  ngOnInit() {
  }

}
