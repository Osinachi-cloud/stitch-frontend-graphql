import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeasurementService } from './measurement.service';
import {
  BodyMeasurementRequest,
  CreateBodyMeasurementResponse,
} from './measurement';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
})
export class MeasurementComponent implements OnInit {
  isSideNavCollapsed = true;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  measurementForm!: any;

  testForm: any = {
    neck: '',
    chest: '',
    tummy: '',
    hipWidth: '',
    neckToHipLength: '',
    bicepWidth: '',
    elbowWidth: '',
    wristWidth: '',
    shortSleeveLength: '',
    elbowLength: '',
    longSleeveLength: '',
    waist: '',
    lowerHipWidth: '',
    thighWidth: '',
    kneeWidth: '',
    ankleWidth: '',
    kneeLength: '',
    ankleLength: '',
  };

  topBodyForm = [
    {
      id: 1,
      name: 'Neck',
      value: 'neck',
    },
    {
      id: 2,
      name: 'Chest',
      value: 'chest',
    },
    {
      id: 3,
      name: 'Tummy',
      value: 'tummy',
    },
    {
      id: 4,
      name: 'Hip Width',
      value: 'hipWidth',
    },
    {
      id: 5,
      name: 'Length (neck to hip)',
      value: 'neckToHipLength',
    },
  ];
  handBodyForm = [
    {
      id: 1,
      name: 'Bicep width',
      value: 'bicepWidth',
    },
    {
      id: 2,
      name: 'Elbow width',
      value: 'elbowWidth',
    },
    {
      id: 3,
      name: 'Wrist width',
      value: 'wristWidth',
    },
    {
      id: 4,
      name: 'Short sleeve length',
      value: 'shortSleeveLength',
    },
    {
      id: 5,
      name: 'Elbow length',
      value: 'elbowLength',
    },
    {
      id: 6,
      name: 'Long sleeve length',
      value: 'longSleeveLength',
    },
  ];
  lowerBodyForm = [
    {
      id: 1,
      name: 'Waist',
      value: 'waist',
    },
    {
      id: 2,
      name: 'Hip width',
      value: 'lowerHipWidth',
    },
    {
      id: 3,
      name: 'Thigh width',
      value: 'thighWidth',
    },
    {
      id: 4,
      name: 'Knee width',
      value: 'kneeWidth',
    },
    {
      id: 5,
      name: 'Ankle width',
      value: 'ankleWidth',
    },
    {
      id: 6,
      name: 'Knee Length (Waist to Knee)',
      value: 'kneeLength',
    },
    {
      id: 7,
      name: 'Ankle Length (Waist to Ankle)',
      value: 'ankleLength',
    },
  ];

  isValid = true;

  constructor(
    private measurementService: MeasurementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.measurementForm = this.fb.group({
      neck: '',
      chest: '',
      tummy: '',
      hipWidth: '',
      neckToHipLength: '',
      shortSleeveAtBiceps: '',
      midSleeveAtElbow: '',
      longSleeveAtWrist: '',
      waist: '',
      thigh: '',
      knee: '',
      ankle: '',
      kneeLength: '',
      ankleLength: '',
      // neck: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // chest: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // tummy: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // hipWidth: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // neckToHipLength: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // shortSleeveAtBiceps: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // midSleeveAtElbow: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // longSleeveAtWrist: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // waist: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // thigh: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // knee: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // ankle: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // kneeLength: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // ankleLength: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  // onSubmit(): void {
  //   if (this.measurementForm.valid) {
  //     console.log(this.measurementForm.value, 'naso');
  //     const formValues = this.measurementForm.value;
  //     const bodyMeasurementRequest: BodyMeasurementRequest = {
  //       neck: +formValues.neck,
  //       shoulder: +formValues.shoulder,
  //       chest: +formValues.chest,
  //       tummy: +formValues.tummy,
  //       hipWidth: +formValues.hipWidth,
  //       neckToHipLength: +formValues.neckToHipLength,
  //       shortSleeveAtBiceps: +formValues.shortSleeveAtBiceps,
  //       midSleeveAtElbow: +formValues.midSleeveAtElbow,
  //       longSleeveAtWrist: +formValues.longSleeveAtWrist,
  //       waist: +formValues.waist,
  //       thigh: +formValues.thigh,
  //       knee: +formValues.knee,
  //       ankle: +formValues.ankle,
  //       trouserLength: +formValues.trouserLength,
  //     };

  //     this.measurementService
  //       .createBodyMeasurement(bodyMeasurementRequest)
  //       .subscribe(
  //         (response: CreateBodyMeasurementResponse) => {
  //           console.log('Measurement saved successfully', response);
  //           this.resetForm();
  //         },
  //         (error) => {
  //           console.error('Error saving measurement', error);
  //         }
  //       );
  //   } else {
  //     this.measurementForm.markAllAsTouched();
  //     console.error('Form is invalid');
  //   }
  // }

  submiting() {
    console.log(this.testForm)
    this.measurementService.createBodyMeasurement(this.testForm).subscribe(
      (response) => {
        console.log('Measurement saved successfully', response);
      },
      (error) => {
        console.error('Error saving measurement', error);
      }
    );
  }

  validateNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const regex = /^\d+$/; // Regular expression to allow only whole numbers

    this.isValid = regex.test(value);

    if (!this.isValid) {
      // If invalid, you can either clear the input or show a message
      inputElement.value = '';
    }
  }

  resetForm(): void {
    this.measurementForm.reset();
  }
}
