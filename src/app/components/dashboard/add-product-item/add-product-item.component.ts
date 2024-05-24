import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InventoryService } from 'src/app/services/inventory.service';
import { UtilService } from 'src/app/services/util.service';

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
  productImage = "";
  selectedImage: File | any = null;
  base64Char = "";



  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private inventoryService: InventoryService

  ) {
    // this.productForm = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   shortDescription: new FormControl('', [Validators.required]),
    //   longDescription: new FormControl('', [Validators.required]),
    //   category: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
    //   sellingPrice: new FormControl('', [Validators.required, Validators.pattern('^.+@.+\..+$')]),
    //   readyIn: new FormControl('', [Validators.required]),
    //   discount: new FormControl('', [Validators.required]),
    //   expiryDate: new FormControl('', [Validators.required]),
    //   materialUsed: new FormControl('', [Validators.required]),
    // });

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      category: ['', [Validators.required]],
      sellingPrice: ['', Validators.required],
      readyIn: ['', Validators.required],
      discount: [0, Validators.required],
      expiryDate: ['', Validators.required],
      materialUsed: ['', Validators.required],
      // productImage:['', Validators.required],

      productImage: new FormControl(UtilService.formatBase64(this.base64Char), [Validators.required]),

      image1: [''],
      image2: [''],

      amount: [500, Validators.required],
      quantity: [4, Validators.required],
      fixedPrice: [true, Validators.required],
      code: ["1234", Validators.required],
      // productImage: ['trye', Validators.required],
      publishStatus: ['PUBLISH', Validators.required],


    });

  }

  get formData() {
    return this.productForm?.controls ?? {};
  }

  validateForm() {

    for (let i in this.productForm.controls)
      this.productForm.controls[i].markAsTouched();
  }


  ngOnInit(): void {
    console.log(this.formSubmitted);
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
    this.productForm.reset();
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.setErrors(null);
    });
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  onSubmit(): void {
    console.log("first", this.productForm.value);
    if (this.productForm?.valid) {
      console.log("second", this.productForm.value);

      this.inventoryService.createProduct(this.productForm.value).subscribe({
        next: (response: any) => {
          console.log("third", this.productForm.value);
          this.showSuccessResponse("Sign Up ", "Sign Up Successful", 3000);
        },
        error: (error: any) => {
          this.showFailureResponse("Sign Up Error", error.message, 3000);
          console.error("entered error", error);
        }
      });
    } else {
      this.showFailureResponse("Sign Up Error", "Invalid form", 3000);
    }
  }

  onFileSelected(event: any): void {
    console.log("==================" + event);

    this.selectedImage = event.target.files[0];

    console.log("==================");

    console.log(this.selectedImage);

    console.log("==================");


    const reader = new FileReader();
    reader.onloadend = () => {
      this.productForm.patchValue({
        
        productImage: UtilService.formatBase64(reader.result as string)
      });
    };

    reader.readAsDataURL(this.selectedImage);
  }



}
