import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import { PageRequest, ProductRequest, Products } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductlikesService extends ApolloService{

  getAllProductLikes(pageRequest: PageRequest): Observable<FetchResult<any>> {
    const query = gql`
      query getAllProductLikes(
        $page: Int!,
        $size: Int!
      ) {
        getAllProductLikes(
          pageRequest: {
            page: $page,
            size: $size
          }
        ) {
          page
          size
          total
          data {
            name
            amount
            sellingPrice
            productId
            publishStatus
            outOfStock
          }
        }
      }
    `;
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
    return this.apollo.query<any>({
      query: query,
      variables: {
        page: pageRequest.page,
        size: pageRequest.size,
      },
      context: {
        headers,
      },
    });
  }


  deleteProductLike(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation deleteProductLike($productId: String!) {
        deleteProductLike(productId: $productId){
            code
            message
        }
      }
    `;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);

    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { productId },
      context: {
        headers,
      },
    });
  }
  
}
