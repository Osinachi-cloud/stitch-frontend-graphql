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
export class ProductService extends ApolloService {

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
            productVariation {
              color
              sleeveType
            }
            vendor{
                customerId
                firstName
                lastName
                emailAddress
                username
                phoneNumber

            }
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

  getProductByProductId(productId: string): Observable<FetchResult<any>> {
    const query = gql`
      query{
        getProductByProductId(productId: "${productId}"){
          name
          code
          productImage
          amount
          quantity
          outOfStock
          category
          provider
          fixedPrice
          country
          productVariation {
              color
              sleeveType
          }
          vendor{
                customerId
                firstName
                lastName
                emailAddress
                username
                phoneNumber

          }
        }
      }
    `;

    // const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);

    return this.apollo.query<any>({
      query: query,
      variables: {
        productId: productId,
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
            productVariation {
              color
              sleeveType
            }
            vendor{
                customerId
                firstName
                lastName
                emailAddress
                username
                phoneNumber
   
            }
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
