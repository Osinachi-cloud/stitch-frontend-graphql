import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  showModal = false;
  authForm: FormGroup;
  showPassword: boolean = false;
  password: string = "password";
  formSubmitted: boolean = false;
  apiResponse: any;
  countryCode: string = "";
  countryName: string = "NIGERIA";


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private clientService: ClientsService,
    private router: Router,
    private toast: NgToastService

  ) {
    this.authForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
      country: new FormControl(this.countryName),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // optionChecked: new FormControl('', [Validators.required]),

    });

  }

  get formData() { return this.authForm.controls; };

  validateForm() {

    for (let i in this.authForm.controls)
      this.authForm.controls[i].markAsTouched();
  }

  ngOnInit(): void {
    // this.getCountryCode();
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
      fullName: '',
      email: '',
      password: '',
      optionChecked: '',
    });
  }

  getCountryCode():string{
    this.clientService.getCountryCode().subscribe({
      next: (res: any) => {
        this.countryCode = res.country;
        console.log(this.countryCode);

      },
      error: (err: any) => {
        console.error('Error fetching country name:', err);
      }
    });
    // return this.countryCode;
    return "NG";
  }

  getCountryName(countryCode: string): string {

    this.clientService.getCountryNameByCode(countryCode).subscribe({
      next: (res: any) => {
        this.countryName = res.name;
        console.log("country name1: " +this.countryName);
        console.log(res.name);

      },
      error: (err: any) => {
        console.error('Error fetching country name:', err);
      }
    });
    console.log("country name2: " + this.countryName);
    return this.countryName;
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({detail:message,summary:header ,duration:duration});
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({detail:message,summary:header ,duration:duration});
  }

  onSubmit() {
    // this.getCountryName(this.getCountryCode());
    if (this.authForm.valid) {
    this.authService.signup(this.authForm.value).subscribe({
      next: (response: any) => {
        this.showSuccessResponse("Sign Up ", "Sign Up Successful", 3000);
        this.router.navigate(["login"]);

      },
      error: (error: any) => {
        this.showFailureResponse("Sign Up Error", error.message,  3000);
        console.error("entered error", error);
      }
    });
    }else{
      this.showFailureResponse("Sign Up Error", "Invalid form",  3000);
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

