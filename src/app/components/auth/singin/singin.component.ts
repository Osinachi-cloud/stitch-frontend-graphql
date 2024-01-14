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


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],

})
export class SinginComponent implements OnInit{

  showModal = false;
  authForm: FormGroup;	  
  showPassword: boolean = false;
  password:string = "password";
  formSubmitted: boolean = false;
  apiResponse:any;

  constructor( private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    // private tokenService: TokenService
    
    ) {
    this.authForm = new FormGroup({
       emailAddress: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
       password: new FormControl(  '',  [Validators.required]),
       optionChecked : new FormControl('',),
  
    }); 
    
    // this.authForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.pattern('^.+@.+\..+$')]],
    //   password: ['', [Validators.required]],
    //   optionChecked: ['', [Validators.required]],
    // });
  }


   get formData() { return this.authForm.controls; };

validateForm() { 

for(let i in this.authForm.controls)
  this.authForm.controls[i].markAsTouched();
}

showSuccess() {
  this.toast.success({detail:"SUCCESS",summary:this.apiResponse.displayMessage ,duration:5000});
}

ngOnInit(): void {
  this.showSuccess();
console.log(this.formSubmitted); 
}


toggleShowPassword(){
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

// onSubmit(user: any): void {
// console.log(this.formSubmitted);
//   this.formSubmitted = true;
//   if (this.authForm.valid) {
//     console.log({ user });
//     this.authService.accountLogin(this.authForm.value).subscribe({
//       next: (response) => {
//         console.log("response =>>>>", response);
//         this.apiResponse = response;
//         console.log(this.apiResponse);
//         this.resetFormInputs();
//         this.showSuccess()
//         this.toggleModal();
        
//         // this.router.navigate(['login']);
//       },
//       error: (error) => {
//         console.log("sign up failed", error);
//         this.router.navigate([]);
//       }
//     });
//   } else {
//     console.log(user);
//     this.validateForm();
//   }
// }


onSubmit(user: any) {
  // if (this.authForm.valid) {
    this.authService.login(this.authForm.value).subscribe({
      next:(response: any) => {

        TokenService.setToken(response?.data?.login?.accessToken);
        UtilService.setUserDetails(response?.data?.login);

        this.router.navigate(["dashboard"]);

        console.log({response});
      },
      error:(error: any) => {
        console.error("entered error", error);
      }
  });
  // }else{
  //   console.log("form values  not valid")
  // }
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

  toggleModal(){
    this.showModal = !this.showModal;
  }


}
