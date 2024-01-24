import { Injectable } from '@angular/core';
import { gql } from 'graphql-tag';
import { FetchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CustomerSignUpRequest, CustomerSignUpResponse, LoginRequest, LoginResponse } from '../types/Type';
import { HttpHeaders } from '@angular/common/http';
import { ApolloService } from './apollo.service';
import { baseUrl, singupUrl } from './utils';



@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApolloService{

  login(loginRequest: LoginRequest): Observable<FetchResult<LoginResponse>> {
    const mutation = gql`
      mutation {
        login(loginRequest: { emailAddress: "${loginRequest.emailAddress}", password: "${loginRequest.password}" }) {
          customerId
          firstName
          lastName
          emailAddress
          phoneNumber
          hasPin
          saveCard
          enablePush
          tier
          country
          accessToken
          refreshToken
          profileImage
        }
      }
    `;

    return this.apollo.mutate<LoginResponse>({
      mutation,
    });
  }

  signup(customerSignUpRequest: CustomerSignUpRequest): Observable<FetchResult<CustomerSignUpResponse>>{

    const mutation = gql`
    mutation{
      createCustomer(customerRequest: {
        emailAddress:"${customerSignUpRequest.emailAddress}",
        password:"${customerSignUpRequest.password}",
        firstName:"${customerSignUpRequest.firstName}",
        lastName:"${customerSignUpRequest.lastName}",
        phoneNumber:"${customerSignUpRequest.phoneNumber}",
        country:"${customerSignUpRequest.country}",
        
      }){
        customerId
        firstName
        lastName
        emailAddress
        phoneNumber
        tier
        country
        hasPin
        enablePush
      }
    }
    `;

    return this.apollo.mutate<CustomerSignUpResponse>({
      mutation
    });
  }



  accountSignUp(signup:any): Observable<any>{
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(baseUrl, signup);
  }

  accountLogin(authCredentials:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(singupUrl, authCredentials);
  }

  forgotPasswordAuth(authCredentials:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(singupUrl, authCredentials);
  }

  passwordReset(usersDetail:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(singupUrl, usersDetail);
  }

  changePasswordAuth(usersDetail:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(singupUrl, usersDetail);
  }

  getTerminalAnalysis(): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.get<any>(singupUrl);
  }



}

