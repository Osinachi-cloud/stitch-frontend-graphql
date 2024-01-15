import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  showModal = false;
  showUserFormModal = false;
  showTerminalFormModal = false;
  selectedImage: File | any = null;
  myform: FormGroup;
  profileImageForm: FormGroup;
  base64Char: string = "";
  emailAddress: string = "";
  imageSource: any;
  userDetails: any = {};
  customerUpdateRequestForm: FormGroup;

  constructor(private http: HttpClient,
    private clientService: ClientsService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router) {


    this.myform = new FormGroup({
      uName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{1,3}[-\s]?\d{9,11}$/)]),
      password: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.pattern('^.+@.+\..+$')]),
      cOption: new FormControl('', [Validators.required]),
      optionChecked: new FormControl('', [Validators.required]),

    });

    this.customerUpdateRequestForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(this.userDetails.phoneNumber),
    });

    this.profileImageForm = new FormGroup({
      profileImage: new FormControl(UtilService.formatBase64(this.base64Char), [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.emailAddress = UtilService.getUserDetails().emailAddress;
    this.getCustomerDetails();
  }

  profileImageExist(): boolean {
    return this.imageSource.length < 1 && this.imageSource == "";
  }

  get formData() { return this.myform.controls; };

  get profileImageFormData() { return this.profileImageForm.controls; };

  get updateCustomerFormData() { return this.customerUpdateRequestForm.controls; };

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleUserFormModal() {
    this.showModal = !this.showModal;
    this.showUserFormModal = !this.showUserFormModal;
  }

  toggleTerminalFormModal() {
    this.showModal = !this.showModal;
    this.showTerminalFormModal = !this.showTerminalFormModal;

  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.profileImageForm.patchValue({
        profileImage: reader.result as string
      });
    };
    reader.readAsDataURL(this.selectedImage);
  }

  onSubmitProfileImage(): void {
    this.base64Char = this.profileImageForm.get('profileImage')?.value;
    this.clientService.updateCustomerProfileImage(UtilService.formatBase64(this.base64Char), this.emailAddress).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (error: any) => {
        console.error("entered error", error);
      }
    });
  }

  getCustomerDetails(): void {
    this.clientService.getCustomerDetails(this.emailAddress).subscribe({
      next: (response: any) => {
        this.userDetails = response.data.customerDetails;
        this.imageSource = `data:image/png;base64, ${this.userDetails.profileImage}`

      },
      error: (error: any) => {
        console.error("entered error", error);
      }
    });
  }

  updateCustomer(): void {
    console.log("entered the update", this.customerUpdateRequestForm);
    if (this.customerUpdateRequestForm.valid) {
      this.clientService.updateCustomer(this.customerUpdateRequestForm.value, this.emailAddress).subscribe({
        next: (response: any) => {
          window.location.reload();

          console.log({ response });
        },
        error: (error: any) => {
          console.error("entered error", error);
        }
      });
    }else{
      console.log("not valid credentials");
    }


  }



}
