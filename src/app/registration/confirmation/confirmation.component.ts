import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit {

  constructor(private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.auth.activate(params.token);
    }).unsubscribe();
  }

}
