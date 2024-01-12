import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { FetchResult, InMemoryCache } from '@apollo/client';
// import { Apollo, gql } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { gql } from 'graphql-tag';
import { MutationOptions, FetchResult, InMemoryCache } from '@apollo/client/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

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


  getCountryCode() {
    return this.httpClient.get<any>('https://ipinfo.io/json');
  }

  // getCountryNameByCode(countryCode: string):Observable<string> {
  //   return this.httpClient.get<any>(`https://restcountries.com/v2/alpha/${countryCode}`).pipe(
  //     map((res: any)=> {
  //       console.log("map",res);
  //       return res.name;
  //     })
  //   );
  // }



  updateCustomer(customerUpdateRequest: any, emailAddress: string): Observable<FetchResult<any>>{

    console.log("entered the submit service btn");

    const mutation = gql`
    mutation{
      updateCustomer(customerRequest: {
        firstName:"${customerUpdateRequest.firstName}",
        lastName:"${customerUpdateRequest.lastName}",
        country:"${customerUpdateRequest.country}",
        profileImage:"${customerUpdateRequest.profileImage}"
      }, emailAddress:"${emailAddress}"){
        customerId
        firstName
        lastName
        emailAddress
        phoneNumber
        tier
        country
        hasPin
        enablePush
        profileImage
      }
    }
    `;

    return this.apollo.mutate<any>({
      mutation
    });
  }


  getCountryNameByCode(countryCode: string) {
    return this.httpClient.get<any>(`https://restcountries.com/v2/alpha/${countryCode}`);
  }

  terminalRequest(userDetails:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.baseURL + "terminal request", userDetails);
  }

  accountLogin(authCredentials:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, authCredentials);
  }

  passwordReset(usersDetail:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.httpClient.post<any>(this.singupUrl, usersDetail);
  }

  getTerminals(): Observable<any> {
    return this.httpClient.get<any>('assets/data/orders.json');
  }
  
  getTerminal1(): Observable<any> {
    return this.httpClient.get<any>('assets/data/terminalData1.json');
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>('assets/data/userData.json');
  }

  getUsersList(): Observable<any> {
    return this.httpClient.get<any>('assets/data/usersList.json');
  }
  
  getActionTerminals(): Observable<any>{
    return this.httpClient.get<any>('assets/data/actionTerminal.json');
  }
  getTerminal():Observable <any> {
    return this.httpClient.get<any>('assets/data/eachTerminal.json');

  }
  getTransactions():Observable<any>{
    return this.httpClient.get<any>('assets/data/transactions.json').pipe(map((res: any) => {
      console.log("API response>>", res);
      return res;
    }))
  }
}
