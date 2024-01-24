import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import { gql } from 'apollo-angular';
import { ProductOrder } from '../types/Type';
import { UtilService } from './util.service';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApolloService{

  getCustomerOrders(productOrder: ProductOrder): Observable<FetchResult<any>> {
    const query = gql`
      query FetchCustomerOrders($productId: String, $customerId: String!, $status: String, $orderId: String, $productCategory: String, $vendorId: String, $page: Int!, $size: Int!) {
        fetchCustomerOrdersBy(
          productId: $productId,
          customerId: $customerId,
          status: $status,
          orderId: $orderId,
          productCategory: $productCategory,
          vendorId: $vendorId,
          page: $page,
          size: $size
        ) {
          page
          size
          total
          data {
            amount
            vendorId
            orderId
            status
            dateCreated
            currency
            customerId
          }
        }
      }
    `;
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${TokenService.getToken()}`);
  
    return this.apollo.query<any>({
      query: query,
      variables: {
        productId: productOrder.productId,
        customerId: UtilService.getUserDetails().customerId,
        status: productOrder.status,
        orderId: productOrder.orderId,
        productCategory: productOrder.productCategory,
        vendorId: productOrder.vendorId,
        page: productOrder.page,
        size: productOrder.size,
      },
      context: {
        headers,
      },
    });
  }


  getOrderStats(): Observable<FetchResult<any>>{
    const query = gql`
    query{
      getProductOrderStatsByCustomer(customerId: "${UtilService.getUserDetails().customerId}"){
        allOrdersCount
        processingOrdersCount
        cancelledOrdersCount
        failedOrdersCount
        completedOrdersCount
      }
    }
    `;

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${TokenService.getToken()}`)

    return this.apollo.query<any>({
      query,
      context: {
        headers
      }
    });
  }
  

}
