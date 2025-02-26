import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Component, VERSION } from '@angular/core';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenService } from 'src/app/services/token.service';
import { UtilService } from 'src/app/services/util.service';
// import {Component} from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],

})
export class SinginComponent implements OnInit {

  showModal = false;
  authForm: FormGroup;
  showPassword: boolean = false;
  password: string = "password";
  formSubmitted: boolean = false;
  apiResponse: any;
  isLoading: boolean = false;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    private messageService: MessageService

  ) {
    this.authForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
      password: new FormControl('', [Validators.required]),
      //  optionChecked : new FormControl('',),

    });
  }


  get formData() { return this.authForm.controls; };

  validateForm() {
    for (let i in this.authForm.controls)
      this.authForm.controls[i].markAsTouched();
  }

  ngOnInit(): void {

  }

  toggleShowPassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }

  resetFormInputs() {
    this.authForm.setValue({
      email: '',
      password: '',
      optionChecked: '',
    });
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  onSubmit() {
    console.log("hello world2");
    this.isLoading = true;
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSuccessResponse("Login ", "Login Successful", 3000);
          TokenService.setToken(response?.data?.customerLogin?.accessToken);
          UtilService.setUserDetails(response?.data?.customerLogin);

          // this.router.navigate([""]);
          this.router.navigate([''], { fragment: 'products' });

          console.log({ response });
        },
        error: (error: any) => {
          this.isLoading = false;
          this.showFailureResponse("Login Error", error.message, 3000);
          console.error("entered error", error);
        }
      });
    } else {
      console.log("form values  not valid")
      this.showFailureResponse("Login Error", "Invalid Input", 3000);

    }
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }


}
