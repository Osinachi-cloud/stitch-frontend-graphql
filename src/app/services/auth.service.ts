// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Apollo } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import gql from 'graphql-tag';
// import { graphql } from 'graphql';


// interface LoginResponse {
//   login: {
//     customerId: string;
//     firstName: string;
//     lastName: string;
//     emailAddress: string;
//     phoneNumber: string;
//     hasPin: boolean;
//     saveCard: boolean;
//     enablePush: boolean;
//     tier: string;
//     country: string;
//     accessToken: string;
//     refreshToken: string;
//   };
// }



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   baseURL = "http://localhost:8080";
//   singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';


//   // constructor(private http: HttpClient) { }

//   constructor(private apollo: Apollo, private httpLink: HttpLink, private http: HttpClient) {
//     const uri = 'http://localhost:8085/'; // Replace with your GraphQL server URL
//     const http_graphql = httpLink.create({ uri });
//     apollo.create({
//       link: http_graphql,
//       cache: new InMemoryCache(),
//     });
//   }



//   login(email: string, password: string) {
//     const mutation = gql`
//       mutation {
//         login(loginRequest: { emailAddress: "${email}", password: "${password}" }) {
//           customerId
//           firstName
//           lastName
//           emailAddress
//           phoneNumber
//           hasPin
//           saveCard
//           enablePush
//           tier
//           country
//           accessToken
//           refreshToken
//         }
//       }
//     `;

//     return this.apollo.mutate<LoginResponse>({
//       mutation,
//     });
//   }







  // accountSignUp(signup:any): Observable<any>{
  //   console.log("hello world");
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.post<any>(this.baseURL, signup);
  // }

  // accountLogin(authCredentials:any): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.post<any>(this.singupUrl, authCredentials);
  // }

  // forgotPasswordAuth(authCredentials:any): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.post<any>(this.singupUrl, authCredentials);
  // }

  // passwordReset(usersDetail:any): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.post<any>(this.singupUrl, usersDetail);
  // }

  // changePasswordAuth(usersDetail:any): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.post<any>(this.singupUrl, usersDetail);
  // }

  // getTerminalAnalysis(): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .append('Content-Type', 'application/json')
  //   return this.httpClient.get<any>(this.singupUrl);
  // }
 
// }



import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { gql } from 'graphql-tag';
import { MutationOptions, FetchResult, InMemoryCache } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../types/Type';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseURL = "http://localhost:8080";
  singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';

  constructor(private apollo: Apollo, private httpLink: HttpLink, private httpClient: HttpClient) {
    const uri = 'http://localhost:8085/graphql'; 
    const http = httpLink.create({ uri });
    apollo.create({
      link: http,
      cache: new InMemoryCache(),
    });
  }

  login(loginRequest: LoginRequest): Observable<FetchResult<LoginResponse>> {
    const mutation = gql`
      mutation {
        login(loginRequest: { emailAddress: "${loginRequest.email}", password: "${loginRequest.password}" }) {
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
        }
      }
    `;

    return this.apollo.mutate<LoginResponse>({
      mutation,
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

