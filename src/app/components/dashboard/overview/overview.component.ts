import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  showModal = false;
  showUserFormModal = false;
  showTerminalFormModal = false;

  myform : FormGroup;

  constructor( private http: HttpClient,
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
    }

  get formData() { return this.myform.controls; };

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



}
