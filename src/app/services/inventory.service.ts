import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {
  }

  getUsersList(): Observable<any> {
    return this.http.get<any>('assets/data/usersList.json');
  }
}
