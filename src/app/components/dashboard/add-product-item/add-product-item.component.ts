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

  get formData() { return this.productForm.controls; };

  validateForm() {

    for (let i in this.productForm.controls)
      this.productForm.controls[i].markAsTouched();
  }

  onSubmit(){
    
  }

}
