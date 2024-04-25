import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import gql from 'graphql-tag';
import { TokenService } from './token.service';
import { UtilService } from './util.service';
import { FetchResult } from '@apollo/client';
import { Products } from '../types/Type';

@Injectable({
  providedIn: 'root'
})
export class InventoryService{

  constructor(private http: HttpClient) {
  }

  getProductsByVendorId(): Observable<any> {
    return this.http.get<any>('assets/data/usersList.json');
  }

  // getProductsByVendorId(product: Products): Observable<FetchResult<any>> {
  //   const query = gql`
  //     query getProductsByVendorId($vendorId: String, $page: Int!, $size: Int!) {
  //       getProductsByVendorId(
  //         vendorId: $vendorId,

  //         page: $page,
  //         size: $size
  //       ) {
  //         page
  //         size
  //         total
  //         data {
  //           name
  //           category
  //           quantity
  //           vendor
  //           amount
  //           quantity
  //           outOfStock
  //           fixedPrice
  //           code
  //           productImage
  //           publishStatus
  //           discount

  //         }
  //       }
  //     }
  //   `;
  
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
  //   return this.apollo.query<any>({
  //     query: query,
  //     variables: {
  //       // vendorId: product.vendorId,
  //       vendorId: UtilService.getUserDetails().vendorId,

  //       // status: product.status,
  //       // productCategory: product.productCategory,
  //       // vendorId: product.vendorId,
  //       page: product.page,
  //       size: product.size,
  //     },
  //     context: {
  //       headers,
  //     },
  //   });
  // }
}
