import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

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
  myform : FormGroup;
  profileImageForm: FormGroup;
  emailAddress: string = "";
  base64Char : String = "";  

  constructor( private http: HttpClient,
    private clientService: ClientsService,
    private formBuilder: FormBuilder,
    private router: Router){


      this.myform = new FormGroup({
        uName: new FormControl('',	[Validators.required]),
        mobile: new FormControl('',	[Validators.required,  Validators.pattern(/^\+?\d{1,3}[-\s]?\d{9,11}$/)]),
        password: new FormControl('',  [Validators.required]),
        eMail: new FormControl('',  [ Validators.pattern('^.+@.+\..+$')]),
        cOption: new FormControl('',   [Validators.required]),
        optionChecked : new FormControl('',   [Validators.required]),
   
     }); 

      this.profileImageForm = new FormGroup({
        profileImage: new FormControl( this.base64Char,	[Validators.required]),
      })
    }

  get formData() { return this.myform.controls; };

  get profileImageFormData() { return this.profileImageForm.controls; };


  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleUserFormModal(){
    this.showModal = !this.showModal;
    this.showUserFormModal = !this.showUserFormModal;
  }

  toggleTerminalFormModal(){
    this.showModal = !this.showModal;
    this.showTerminalFormModal = !this.showTerminalFormModal;

  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    
    // Read the selected image as a base64-encoded string
    const reader = new FileReader();
    reader.onloadend = () => {
      this.profileImageForm.patchValue({
        profileImage: reader.result as string
      });
    };
    reader.readAsDataURL(this.selectedImage);
    this.base64Char = this.profileImageForm.get('profileImage')?.value;

  }

  // onSubmitProfileImage(user: any){

  //   console.log("entered the submit btn");
  //   console.log(this.profileImageForm.value);

  //   this.clientService.updateCustomer(this.profileImageForm.value, this.emailAddress).subscribe({
  //     next: (response: any) => {

  //       console.log("entered response", response);
  //     },
  //     error: (error: any) => {
  //       console.error("entered error", error);
  //     }
  //   });
  // }

  onSubmitProfileImage(user: any): void {

    console.log("entered the submit btn");
    this.base64Char = this.profileImageForm.get('profileImage')?.value;

    console.log(this.base64Char);

    console.log(this.profileImageForm.value);

    // Use FormData to send the base64-encoded image to the backend
    const formData = new FormData();
    formData.append('profileImage', this.profileImageForm.get('profileImage')?.value);

    this.clientService.updateCustomer(formData, this.emailAddress).subscribe({
      next: (response: any) => {
        console.log("entered response", response);
      },
      error: (error: any) => {
        console.error("entered error", error);
      }
    });
  }



}
