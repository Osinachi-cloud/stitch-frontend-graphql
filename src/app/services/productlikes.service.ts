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

  token = TokenService.getToken();
  userAuthenticated = this.token && !TokenService.isTokenExpired(this.token);

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
            productImage
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


  addProductLikes(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation addProductLikes($productId: String!) {
        addProductLikes(productId: $productId){
            code
            message
        }
      }
    `;

    let headers = new HttpHeaders();

    const token = TokenService.getToken();


    if(!token || token?.length > 0){
      
     headers = new HttpHeaders({
      'Authorization': `Bearer ${TokenService.getToken()}`,
      'Content-Type': 'application/json'
    }); 
  }
    


    // const token = TokenService.getToken();

    // if (!token || token.length === 0) {
    //   throw new Error('User is not authenticated');
    // }
  
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    //   'Content-Type': 'application/json'
    // });

    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { productId },
      context: {
        headers,
      },
    });
  }
  
}
