import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import { BodyMeasurementRequest, CreateBodyMeasurementResponse, PageRequest, ProductRequest, Products } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class BodyMeasurementService extends ApolloService{

  createBodyMeasurements(bodyMeasurementRequest: BodyMeasurementRequest): Observable<FetchResult<CreateBodyMeasurementResponse>> {
    console.log("1234567890")
    console.log({bodyMeasurementRequest});

    console.log("1234567890")


    
    const mutation = gql`
      mutation {
        createBodyMeasurement(bodyMeasurementRequest: { 
            neck:"${bodyMeasurementRequest.neck}",
            shoulder:"${bodyMeasurementRequest.shoulder}",
            chest:"${bodyMeasurementRequest.chest}",
            tummy:"${bodyMeasurementRequest.tummy}",
            hipWidth:"${bodyMeasurementRequest.hipWidth}",
            neckToHipLength:"${bodyMeasurementRequest.neckToHipLength}",
            shortSleeveAtBiceps:"${bodyMeasurementRequest.shortSleeveAtBiceps}",
            midSleeveAtElbow:"${bodyMeasurementRequest.midSleeveAtElbow}",
            longSleeveAtWrist:"${bodyMeasurementRequest.longSleeveAtWrist}",
            waist:"${bodyMeasurementRequest.waist}",
            thigh:"${bodyMeasurementRequest.thigh}",
            knee:"${bodyMeasurementRequest.knee}",
            ankle:"${bodyMeasurementRequest.ankle}"
            trouserLength:"${bodyMeasurementRequest.trouserLength}"
        }) {
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

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${TokenService.getToken()}`)

    return this.apollo.mutate<CreateBodyMeasurementResponse>({
      mutation,
      context: {
        headers
      }
    });
  }


  createBodyMeasurement(bodyMeasurementRequest: BodyMeasurementRequest): Observable<FetchResult<CreateBodyMeasurementResponse>> {
    console.log("1234567890")
    console.log({ bodyMeasurementRequest });
  
    console.log("1234567890")
  
    const requestBody = {
      neck: bodyMeasurementRequest.neck,
      shoulder: bodyMeasurementRequest.shoulder,
      chest: bodyMeasurementRequest.chest,
      tummy: bodyMeasurementRequest.tummy,
      hipWidth: bodyMeasurementRequest.hipWidth,
      neckToHipLength: bodyMeasurementRequest.neckToHipLength,
      shortSleeveAtBiceps: bodyMeasurementRequest.shortSleeveAtBiceps,
      midSleeveAtElbow: bodyMeasurementRequest.midSleeveAtElbow,
      longSleeveAtWrist: bodyMeasurementRequest.longSleeveAtWrist,
      waist: bodyMeasurementRequest.waist,
      thigh: bodyMeasurementRequest.thigh,
      knee: bodyMeasurementRequest.knee,
      ankle: bodyMeasurementRequest.ankle,
      trouserLength: bodyMeasurementRequest.trouserLength
    };
  
    const mutation = gql`
      mutation($requestBody: BodyMeasurementRequest) {
        createBodyMeasurement(bodyMeasurementRequest: $requestBody) {
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
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${TokenService.getToken()}`);
  
    return this.apollo.mutate<CreateBodyMeasurementResponse>({
      mutation,
      variables: { requestBody },
      context: {
        headers
      }
    });
  }




  getBodyMeasurementByUser(): Observable<FetchResult<any>> {
    const query = gql`
      query{
        getBodyMeasurementByUser{
          tag
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

    return this.apollo.query<any>({
      query: query,
      variables: {

      },
      context: {
        headers,
      },
    });
  }
}
