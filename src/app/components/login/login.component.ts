import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    //  علشان طول ما في عندى توكين ميخلنيش اعرف افتح اللوجين او الريجيسترالا لما اعمل تسجيل خروج
    if (this._AuthService.userData.getValue() != null) {
      this._Router.navigate(['/profile']);
    }
  }

  isStyleInvalid = {
    'background-color': 'gray',
    'border-color': 'gray',
    color: '#fff',
    'font-weight': 'bold',
  };
  isStyleValid = {
    'background-color': '#17a2b8',
    'border-color': '#17a2b8',
    color: '#fff',
    'font-weight': 'bold',
  };
  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{5,15}$/),
    ]),
  });

  submitLoginForm(loginForm: FormGroup) {
    this.spinner.show();
    if (loginForm.valid) {
      this._AuthService.signIn(loginForm.value).subscribe((response) => {
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token);
          this._AuthService.saveUserData();
          this.toastr.success('Success');
          this._Router.navigate(['./profile']);
        } else {
          this.toastr.error(response.message, 'Failed');
          this.error = response.message;
          setTimeout(() => {
            this.error = '';
          }, 2000);
        }
      });
    } else {
      console.log('notvalid');
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.loginForm.reset();
  }

  ngOnInit(): void {
    $('#signin').particleground();
  }
}
