import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { gql } from 'graphql-tag';
import { MutationOptions, FetchResult, InMemoryCache } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CustomerSignUpRequest, CustomerSignUpResponse, LoginRequest, LoginResponse } from '../types/Type';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AuthService {


  baseURL = "http://localhost:8080";
  singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';

  constructor(private apollo: Apollo, private httpLink: HttpLink, private httpClient: HttpClient) {
    // const uri = 'http://localhost:8085/graphql'; 
    // const http = httpLink.create({ uri });
    // apollo.create({
    //   link: http,
    //   cache: new InMemoryCache(),
    // });
  }

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
    return this.httpClient.post<any>(this.baseURL, signup);
  }

  accountLogin(authCredentials:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, authCredentials);
  }

  forgotPasswordAuth(authCredentials:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, authCredentials);
  }

  passwordReset(usersDetail:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, usersDetail);
  }

  changePasswordAuth(usersDetail:any): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, usersDetail);
  }

  getTerminalAnalysis(): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.get<any>(this.singupUrl);
  }



}

