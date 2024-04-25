import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-product-item',
  templateUrl: './add-product-item.component.html',
  styleUrls: ['./add-product-item.component.scss']
})
export class AddProductItemComponent {


  showModal = false;
  productForm: FormGroup;
  showPassword: boolean = false;
  password: string = "password";
  formSubmitted: boolean = false;
  apiResponse: any;
  countryCode: string = "";
  countryName: string = "NIGERIA";



  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService

  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      longDescription: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
      sellingPrice: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
      readyIn: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required]),
      materialUsed: new FormControl('', [Validators.required]),
    });

  }

    
    // this.authForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.pattern('^.+@.+\..+$')]],
    //   password: ['', [Validators.required]],
    //   optionChecked: ['', [Validators.required]],
    // });
  


   get formData() { return this.productForm.controls; };

validateForm() { 

for(let i in this.productForm.controls)
  this.productForm.controls[i].markAsTouched();
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
  this.productForm.setValue({
    email: '',
    password: '',
    optionChecked: '',
  });
}

onSubmit(): void {
// console.log(this.formSubmitted);
//   this.formSubmitted = true;
//   if (!this.authForm.valid) {
//     console.log({ user });
//     this.authService.accountLogin(this.authForm.value).subscribe({
//       next: (response) => {
//         console.log("response =>>>>", response);
//         this.apiResponse = response;
//         console.log(this.apiResponse);
//         this.resetFormInputs();
//         this.showSuccess();
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
}



}
