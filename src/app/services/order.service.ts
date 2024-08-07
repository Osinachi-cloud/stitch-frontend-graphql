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
  getProducts() {
    throw new Error('Method not implemented.');
  }

  getCustomerOrders(productOrder: ProductOrder): Observable<FetchResult<any>> {
    const query = gql`
      query FetchCustomerOrders($productId: String, $emailAddress: String!, $status: String, $orderId: String, $productCategory: String, $vendorId: String, $page: Int!, $size: Int!) {
        fetchCustomerOrdersBy(
          productId: $productId,
          emailAddress: $emailAddress,
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
        emailAddress: UtilService.getUserDetails().emailAddress,
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

  fetchVendorOrdersBy(productOrder: ProductOrder): Observable<FetchResult<any>> {
    const query = gql`
      query fetchVendorOrdersBy($productId: String, $status: String, $orderId: String, $productCategory: String, $vendorId: String, $page: Int!, $size: Int!) {
        fetchVendorOrdersBy(
          productId: $productId,
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
        emailAddress: UtilService.getUserDetails().emailAddress,
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
      getProductOrderStatsByCustomer(emailAddress: "${UtilService.getUserDetails().emailAddress}"){
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

  getVendorOrderStats(): Observable<FetchResult<any>>{
    const query = gql`
    query{
      getProductOrderStatsByVendor {
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


  getOrderByOrderId(orderId: string): Observable<FetchResult<any>>{
    const query = gql`
    query {
      getOrderByOrderId(orderId: "${orderId}") {
          amount
          vendorId
          orderId
          status
          dateCreated
          currency
          customerId
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
