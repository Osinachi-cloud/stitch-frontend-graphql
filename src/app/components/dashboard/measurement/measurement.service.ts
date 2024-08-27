import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BodyMeasurementRequest, CreateBodyMeasurementResponse } from './measurement';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private apollo: Apollo) {}

  createBodyMeasurement(bodyMeasurementRequest: BodyMeasurementRequest): Observable<CreateBodyMeasurementResponse> {
    const mutation = gql`
      mutation CreateBodyMeasurement($input: BodyMeasurementInput!) {
        createBodyMeasurement(bodyMeasurementRequest: $input) {
          neck
          shoulder
          chest
          tummy
          hipWidth
          neckToHipLength
          shortSleeveAtBiceps
          midSleeveAtElbow
          longSleeveAtWrist
          waist
          thigh
          knee
          ankle
          trouserLength
        }
      }
    `;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);

    return this.apollo.mutate<{ createBodyMeasurement: CreateBodyMeasurementResponse }>({
      mutation,
      variables: {
        input: bodyMeasurementRequest
      },
      context: {
        headers
      }
    }).pipe(
      map(result => result.data?.createBodyMeasurement as CreateBodyMeasurementResponse) 
    );
  }
}
