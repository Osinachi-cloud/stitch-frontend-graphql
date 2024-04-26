import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
import gql from 'graphql-tag';
import { TokenService } from './token.service';
import { UtilService } from './util.service';
import { FetchResult } from '@apollo/client';
import { ProductRequest, Products } from '../types/Type';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends ApolloService {

  // constructor(private http: HttpClient) {
  // }

  // getProductsByVendorId(): Observable<any> {
  //   return this.http.get<any>('assets/data/usersList.json');
  // }

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



  getProductsBy(productRequest: Products): Observable<FetchResult<any>> {
    const query = gql`
      query getAllProductsBy($productId: String, $category: String, $page: Int!, $size: Int!) {
        getAllProductsBy(productFilterRequest: {
          page:$page,
          size:$size,
          productId:$productId
          category:$category
          
        }){
          page
          size
          total
          data{
            name
            category
            productId
            amount
            quantity
            publishStatus
            discount
            outOfStock
          }
        }
      }
    `;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);

    return this.apollo.query<any>({
      query: query,
      variables: {
        productId: productRequest.productId,
        customerId: UtilService.getUserDetails().customerId,
        category: productRequest.category,
        vendorId: productRequest.vendorId,
        page: productRequest.page,
        size: productRequest.size,
      },
      context: {
        headers,
      },
    });
  }


  togglePublishProduct(productId: string): Observable<FetchResult<any>> {
    const mutation = gql`
      mutation togglePublishProduct($productId: String!) {
        togglePublishProduct(productId: $productId)
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

  createProduct(productRequest: any): Observable<FetchResult<any>> {
    console.log("in service class");
    const query = gql`
      mutation createProduct($productRequest: ProductRequest!) {
        createProduct(productRequest: $productRequest) {
          name
          amount
          quantity
          fixedPrice
          code
          category
          productImage
          publishStatus
          shortDescription
          longDescription
          materialUsed
          readyIn
          amount
          discount

        }
      }
    `;
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
    return this.apollo.mutate<any>({
      mutation: query,
      variables: {
        productRequest: {
          name: productRequest.name,
          category: productRequest.category,
          amount: productRequest.amount,
          quantity: productRequest.quantity,
          code: productRequest.code,
          fixedPrice: true,
          productImage:'imageq',
          publishStatus: productRequest.publishStatus,
          shortDescription: productRequest.shortDescription,
          longDescription: productRequest.longDescription,
          materialUsed: productRequest.materialUsed,
          readyIn: productRequest.readyIn,
          discount: productRequest.discount,
        },
      },
      context: {
        headers,
      },
    });
  }


}
