import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this.spinner.show();
    this._AuthService.logOut();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
