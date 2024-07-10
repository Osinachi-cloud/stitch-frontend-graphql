import { Injectable } from '@angular/core';
import { ApolloService } from './apollo.service';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client';
import { InitializeTransactionResponse, PaymentRequest } from '../types/Type';
import { gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ApolloService{

  initializePayment(paymentRequest: PaymentRequest): Observable<FetchResult<InitializeTransactionResponse>>{

    const mutation = gql`
    mutation{
      initializePayment(paymentRequest: {
        amount:"${paymentRequest.amount}",
        channel:"${paymentRequest.channel}", 
        quantity: "${paymentRequest.quantity}",
        productId: "${paymentRequest.productId}",
        vendorId:  "${paymentRequest.vendorId}",
        narration: "${paymentRequest.narration}",
        productCategoryName: "${paymentRequest.productCategoryName}"        
      }){
      status
      message
      data{
        authorizationUrl
        accessCode
        reference
      }
    }
    }
    `;

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${TokenService.getToken()}`)

    return this.apollo.mutate<InitializeTransactionResponse>({
      mutation,       
      context: {
        headers
      }
    });
  }


  initializePayments(paymentRequest: PaymentRequest): Observable<FetchResult<InitializeTransactionResponse>> {
    console.log({paymentRequest});
    const mutation = gql`
      mutation {
        initializePayment(paymentRequest: { amount: "${paymentRequest.amount}", channel: "${paymentRequest.channel}" }) {
        {
              status
              message
              data{
                authorizationUrl
                accessCode
                reference
              }
            }
        }
      }
    `;

    return this.apollo.mutate<InitializeTransactionResponse>({
      mutation,
    });
  }




}
