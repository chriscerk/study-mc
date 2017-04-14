import { Component, OnInit } from '@angular/core';

// NOTE: This is not a secure login, simply a roadblock for users.
@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class AdminLoginComponent implements OnInit {

  isLoggedIn: boolean;
  submission: string;
  message: string;
  basicKey: string;


  constructor() {
      this.isLoggedIn = false;
  }

  ngOnInit() {
    this.message = '';
    this.basicKey = 'P@ssw0rd';
  }

  verifyUser() {
      if(this.submission === this.basicKey) {
        this.isLoggedIn = true;
      }
      else {
          this.message = 'Incorrect Password!';
      }
  }

}
