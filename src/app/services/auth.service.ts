import { Injectable } from '@angular/core';
import { gql } from 'graphql-tag';
import { FetchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { ContactVerificationResponse, CustomerSignUpRequest, CustomerSignUpResponse, EmailVerificationRequest, LoginRequest, LoginResponse, OtpValidationRequest } from '../types/Type';
import { HttpHeaders } from '@angular/common/http';
import { ApolloService } from './apollo.service';
import { baseUrl, singupUrl } from './utils';



@Injectable({
  providedIn: 'root',
})

export class AuthService extends ApolloService{

  emailVerification(request: EmailVerificationRequest): Observable<FetchResult<ContactVerificationResponse>> {
    const mutation = gql`
      mutation{
        verifyEmail(emailAddress: "${request.emailAddress}"){
          code
          message
        }
      }
    `;

    return this.apollo.mutate<ContactVerificationResponse>({
      mutation,
    });
  }

  otpValidation(request: OtpValidationRequest): Observable<FetchResult<ContactVerificationResponse>> {
    const mutation = gql`
      mutation{
        validateEmailCode(verificationRequest: {
          emailAddress:"${request.emailAddress}",
          verificationCode:"${request.verificationCode}"
        }){
          code
          message
        }
      }
    `;

    return this.apollo.mutate<ContactVerificationResponse>({
      mutation,
    });
  }

  login(loginRequest: LoginRequest): Observable<FetchResult<LoginResponse>> {
    const mutation = gql`
      mutation {
        customerLogin(loginRequest: { emailAddress: "${loginRequest.emailAddress}", password: "${loginRequest.password}" }) {
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
          role
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


  vendorLogin(loginRequest: LoginRequest): Observable<FetchResult<LoginResponse>> {
    const mutation = gql`
      mutation {
        vendorLogin(loginRequest: { emailAddress: "${loginRequest.emailAddress}", password: "${loginRequest.password}" }) {
          vendorId
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
        username:"${customerSignUpRequest.username}",
        password:"${customerSignUpRequest.password}",
        firstName:"${customerSignUpRequest.firstName}",
        lastName:"${customerSignUpRequest.lastName}",
        phoneNumber:"${customerSignUpRequest.phoneNumber}",
        roleName:"${customerSignUpRequest.roleName}",
        
      }){
        customerId
        firstName
        lastName
        emailAddress
        phoneNumber
        tier
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

