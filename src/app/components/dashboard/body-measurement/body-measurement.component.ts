import { Component } from '@angular/core';
import { BodyMeasurementService } from 'src/app/services/body-measurement.service';
import { BodyMeasurementObj, BodyMeasurementRequest } from 'src/app/types/Type';

@Component({
  selector: 'app-body-measurement',
  templateUrl: './body-measurement.component.html',
  styleUrls: ['./body-measurement.component.scss']
})
export class BodyMeasurementComponent {
  bodyMeasurementForm = {};

  topBodyForm: BodyMeasurementObj [] = [
    {
      id: 1,
      name: 'Neck',
      value: "neck",
    },
    {
      id: 2,
      name: 'Chest',
      value: "chest",
    },
    {
      id: 3,
      name: 'Tummy',
      value: "tummy",
    },
    {
      id: 4,
      name: 'Hip Width',
      value: "hipWidth",
    },
    {
      id: 5,
      name: 'Length (neck to hip)',
      value: "neckToHipLength",
    },
    {
      id: 6,
      name: 'Bicep width',
      value: "longSleeveAtWrist",
    },
    {
      id: 7,
      name: 'Elbow width',
      value: "elbowWidth",
    },
    {
      id: 8,
      name: 'Wrist width',
      value: "wristWidth",
    },
    {
      id: 9,
      name: 'Short sleeve length',
      value: "shortSleeve",
    },
    {
      id: 10,
      name: 'Elbow length',
      value: "elbowLength",
    },
    {
      id: 11,
      name: 'Long sleeve length',
      value: "longSleeve",
    },
  ];


  lowerBodyForm : BodyMeasurementObj []= [
    {
      id: 1,
      name: 'Waist',
      value: "waist",
    },
    {
      id: 2,
      name: 'Hip width',
      value: "hipWidth",
    },
    {
      id: 3,
      name: 'Thigh width',
      value: "thigh",
    },
    {
      id: 4,
      name: 'Knee width',
      value: "knee",
    },
    {
      id: 5,
      name: 'Ankle width',
      value: "ankle",
    },
    {
      id: 6,
      name: 'Knee Length (Waist to Knee)',
      value: "kneeLength",
    },
    {
      id: 7,
      name: 'Ankle Length (Waist to Ankle)',
      value: "ankleLength",
    },
  ];
  isValid = true;

  constructor(private bodyMeasurementService: BodyMeasurementService) { }
  // bodyMeasurementRequest : BodyMeasurementRequest = {
  //   neck: this.bodyMeasurementForm
  // };

  submiting() {
    console.log(this.bodyMeasurementForm);
    this.bodyMeasurementService.createBodyMeasurement(this.bodyMeasurementForm).subscribe({
      next : (res: any) => {
        console.log(res);

      }, error : (error: any) => {
        console.error();

      }
    })
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
    // this.measurementForm.reset();
  }
}


// when revsrl comes check in the trans to see if 200 exist using the prev_post_tran_id, if not
// trxByStanAndRRN using the stanAndRRN and get the corresponding trx with 0200, if not found do nothing.
// if found and status= "NOT_SETTLEMENT_SUCCESSFUL" do nothing, else enques settlement to Caeser.
