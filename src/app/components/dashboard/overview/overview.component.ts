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

    this.profileImageForm = new FormGroup({
      profileImage: new FormControl(this.formatBase64(this.base64Char), [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.emailAddress = UtilService.getUserDetails().emailAddress;
    this.getCustomerDetails();
  }

  profileImageExist(): boolean {
    return this.imageSource.length < 1 && this.imageSource == "";
  }

  formatBase64(base64: string): string {
    this.base64Char = base64?.replace("data:image/png;base64,", "");
    return this.base64Char;
  }

  //   formatBase64(base64: string): string {
  //   this.base64Char = base64?.replace("data:image/png;base64,", "");
  //   return this.base64Char;
  // }

  get formData() { return this.myform.controls; };

  get profileImageFormData() { return this.profileImageForm.controls; };


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

    this.base64Char = this.formatBase64(this.profileImageForm.get('profileImage')?.value);

  }

  onSubmitProfileImage(): void {
    this.base64Char = this.profileImageForm.get('profileImage')?.value;
    const formData = new FormData();
    formData.append('profileImage', this.profileImageForm.get('profileImage')?.value);

    this.clientService.updateCustomerProfileImage(this.base64Char, this.emailAddress).subscribe({
      next: (response: any) => {
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



}
