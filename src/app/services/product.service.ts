import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import { Products } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApolloService{

  getProducts(product: Products): Observable<FetchResult<any>> {
    const query = gql`
      query getAllProductsBy($category: String, $page: Int!, $size: Int!) {
        getAllProductsBy(
          page: $page,
          size: $size
        ) {
          page
          size
          total
          data {
            amount
            status
          }
        }
      }
    `;
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
    return this.apollo.query<any>({
      query: query,
      variables: {
        page: product.page,
        size: product.size,
      },
      context: {
        headers,
      },
    });
  }
}
