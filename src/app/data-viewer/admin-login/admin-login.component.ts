import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class AdminLoginComponent implements OnInit {

  isLoggedIn: boolean;
  submission: string;
  message: string;


  constructor() {
      this.isLoggedIn = false;
  }

  ngOnInit() {
    this.message = '';
  }

  verifyUser() {
      if(this.submission === 'pass') {
        this.isLoggedIn = true;
      }
      else {
          this.message = 'Incorrect Password!';
      }
  }

}
