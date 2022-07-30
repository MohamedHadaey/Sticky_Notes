import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    // علشان طول ما في عندى توكين ميخلنيش اعرف افتح اللوجين او الريجيسترالا لما اعمل تسجيل خروج
    if (this._AuthService.userData.getValue() != null) {
      this._Router.navigate(['/profile']);
    }
  }
  ngOnInit(): void {
    $('#signup').particleground();
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
  isClicked: boolean = false;
  loading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^([1-7][0-9]|80)$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{5,15}$/),
    ]),
  });

  submitRegisterForm(registerForm: FormGroup) {
    this.spinner.show();
    this.isClicked = true;
    if (registerForm.invalid) {
      this.loading = true;
      return;
    } else {
      this._AuthService.signUp(registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this.isClicked = false;
          this.loading = false;
          this.toastr.success('Success');
          this._Router.navigate(['/login']);
        } else {
          this.error = response.errors.email.message;
          setTimeout(() => {
            this.error = '';
          }, 2000);
          this.isClicked = false;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.registerForm.reset();
  }
}
