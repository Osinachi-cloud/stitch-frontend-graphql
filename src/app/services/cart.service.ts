import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import { PageRequest, ProductRequest , Products } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApolloService{

  getCart(pageRequest: PageRequest): Observable<FetchResult<any>> {
    const query = gql`
      query getCart(
        $page: Int!,
        $size: Int!
      ) {
        getCart(
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
            amountByQuantity
            quantity
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


  removeEntireProductFromCart(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation removeEntireProductFromCart($productId: String!) {
        removeEntireProductFromCart(productId: $productId){
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

  deleteProductCart(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation deleteProductCart($productId: String!) {
        deleteProductCart(productId: $productId){
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

  addProductCart(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation addProductCart($productId: String!) {
        addProductCart(productId: $productId){
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