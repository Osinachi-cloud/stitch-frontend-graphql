import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseURL = "http://localhost:8080";
  singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';

  constructor(private http: HttpClient) { }

  terminalRequest(userDetails:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(this.baseURL + "terminal request", userDetails);
  }

  accountLogin(authCredentials:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(this.singupUrl, authCredentials);
  }

  passwordReset(usersDetail:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(this.singupUrl, usersDetail);
  }

  getTerminals(): Observable<any> {
    return this.http.get<any>('assets/data/orders.json');
  }
  
  getTerminal1(): Observable<any> {
    return this.http.get<any>('assets/data/terminalData1.json');
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('assets/data/userData.json');
  }

  getUsersList(): Observable<any> {
    return this.http.get<any>('assets/data/usersList.json');
  }
  
  getActionTerminals(): Observable<any>{
    return this.http.get<any>('assets/data/actionTerminal.json');
  }
  getTerminal():Observable <any> {
    return this.http.get<any>('assets/data/eachTerminal.json');

  }
  getTransactions():Observable<any>{
    return this.http.get<any>('assets/data/transactions.json').pipe(map((res: any) => {
      console.log("API response>>", res);
      return res;
    }))
  }
}
