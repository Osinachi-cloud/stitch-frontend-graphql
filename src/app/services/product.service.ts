import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import { ProductList, Products } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApolloService{

  // getProducts(product: Products): Observable<FetchResult<any>> {
  //   const query = gql`
  //     query getAllProductsBy($category: String, $page: Int!, $size: Int!) {
  //       getAllProductsBy(productFilterRequest:{
  //         page: $page,
  //         size: $size
  //       }
  //       ) {
  //         page
  //         size
  //         total
  //         data {
  //           amount
  //           name
  //           category
  //         }
  //       }
  //     }
  //   `;
  
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
  //   return this.apollo.query<any>({
  //     query: query,
  //     variables: {
  //       page: product.page,
  //       size: product.size,


  //     },
  //     context: {
  //       headers,
  //     },
  //   });
  // }


  getProducts(product: Products): Observable<FetchResult<any>> {
    const query = gql`
      query getAllProductsBy($page: Int!, $size: Int!) {
        getAllProductsBy(productFilterRequest:{
          page: $page,
          size: $size
        }
        ) {
          page
          size
          total
          data {
            name
            category
            productId
            amount
            quantity
            publishStatus
            discount
            outOfStock
            productImage
            longDescription
            shortDescription
          }
        }
      }
    `;
    
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
    
    return this.apollo.query<any>({
      query: query,
      variables: {
        page: product.page,
        size: product.size,
        vendorId: product.vendorId,

      },
      context: {
        // headers,
      },
    });
  }


  getAllProductsByAuth(product: Products): Observable<FetchResult<any>> {
    const query = gql`
      query getAllProductsByAuth($page: Int!, $size: Int!) {
        getAllProductsByAuth(productFilterRequest:{
          page: $page,
          size: $size
        }
        ) {
          page
          size
          total
          data {
            name
            category
            productId
            amount
            quantity
            publishStatus
            discount
            outOfStock
            productImage
            longDescription
            shortDescription
            liked
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
        vendorId: product.vendorId,

      },
      context: {
        headers,
      },
    });
  }

}
