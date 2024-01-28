import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilService } from 'src/app/services/util.service';
import { OtpValidationRequest } from 'src/app/types/Type';

@Component({
  selector: 'app-contact-verification',
  templateUrl: './contact-verification.component.html',
  styleUrls: ['./contact-verification.component.scss']
})
export class ContactVerificationComponent {

  verificationForm: FormGroup;
  verificationCode: string = "";
  otpForm: FormGroup;
  showModal = false;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,

  ) {
    this.verificationForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
    });

    this.otpForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
      emailAddress: new FormControl(UtilService.getEmailAddress(), [Validators.required, Validators.pattern('^.+@.+\..+$')]),
    })
  }

  get formData() { return this.verificationForm.controls; };

  validateForm() {

    for (let i in this.verificationForm.controls)
      this.verificationForm.controls[i].markAsTouched();
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      this.authService.emailVerification(this.verificationForm.value).subscribe({
        next: (response: any) => {
          this.showSuccessResponse("Login ", response.data.verifyEmail.message, 3000);
          UtilService.setEmailAddress(this.verificationForm.value.emailAddress);
          this.toggleModal();
        },
        error: (error: any) => {
          this.showFailureResponse("Login Error", error.message, 3000);
          console.error("entered error", error);
        }
      });
    } else {
      this.showFailureResponse("Login Error", "Invalid Form Entry", 3000);
      console.log("form values  not valid")
    }
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 5,
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

  handleFillEvent(value: string): void {
    if (value.length === 5) {
      let optObj: OtpValidationRequest = {
        verificationCode: value,
        emailAddress: UtilService.getEmailAddress()
      }
      this.authService.otpValidation(optObj).subscribe({
        next: (res: any) => {
          UtilService.setUserDetails(res.data);
          this.router.navigate(['signup']);
          TokenService.setToken(res?.token);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }


}
