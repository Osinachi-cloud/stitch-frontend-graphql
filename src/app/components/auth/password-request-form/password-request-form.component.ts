import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-request-form',
  templateUrl: './password-request-form.component.html',
  styleUrls: ['./password-request-form.component.scss']
})
export class PasswordRequestFormComponent {


  showModal = false;
  authForm: FormGroup;	  
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  password:string = "password";
  newPassword: string = "password";
  formSubmitted: boolean = false;
  apiResponse:any;

  constructor( private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
    
    ) {
    this.authForm = new FormGroup({
       password: new FormControl(  '',  [Validators.required]),
       newPassword: new FormControl(  '',  [Validators.required]),
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

toggleShowNewPassword(){
  if (this.newPassword === 'password') {
    this.newPassword = 'text';
    this.showNewPassword = true;
  } else {
    this.newPassword = 'password';
    this.showNewPassword = false;
  }
}

resetFormInputs() {
  this.authForm.setValue({
    password: '',
    newPassword: '',
  });
}

onSubmit(user: any): void {
console.log(this.formSubmitted);
  this.formSubmitted = true;
  if (this.authForm.valid) {
    console.log({ user });
    this.authService.accountLogin(this.authForm.value).subscribe({
      next: (response) => {
        console.log("response =>>>>", response);
        this.apiResponse = response;
        console.log(this.apiResponse);
        this.resetFormInputs();
        this.showSuccess()
        // this.router.navigate(['login']);
      },
      error: (error) => {
        console.log("sign up failed", error);
        this.router.navigate([]);
      }
    });
  } else {
    console.log(user);
    this.validateForm();
  }
}


}
