import { Component } from '@angular/core';
import PaystackPop from '@paystack/inline-js';

@Component({
  selector: 'app-initiate-order',
  templateUrl: './initiate-order.component.html',
  styleUrls: ['./initiate-order.component.scss']
})
export class InitiateOrderComponent {

  emailAddress: string;
  amount: number;

  constructor() { }

  // ngAfterViewInit() {
  //   const paymentForm = document.getElementById('paymentForm');
  //   paymentForm.addEventListener("submit", this.payWithPaystack, false);
  // }

  // payWithPaystack() {
  //   // e.preventDefault();
  //   console.log("hello world");

  //   let handler = PaystackPop.setup({
  //     key: 'pk_test_323e5dfdac044ffe641ab7a9c57053d0d17a5c17', // Replace with your public key
  //     email: this.emailAddress,
  //     amount: this.amount * 100,
  //     ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
  //     // label: "Optional string that replaces customer email"
  //     onClose: () => {
  //       alert('Window closed.');
  //     },
  //     callback: (response: any) => {
  //       let message = 'Payment complete! Reference: ' + response.reference;
  //       alert(message);
  //     }
  //   });

  //   handler.openIframe();
  // }


  pay(){
    const paystackInstance = new PaystackPop();
      const onSuccess = transaction => alert(`Succesful! Ref: ${transaction.reference}`);
      const v  = paystackInstance.newTransaction({
        key: 'pk_test_323e5dfdac044ffe641ab7a9c57053d0d17a5c17',
        email: 'demo@paystack.com',
        amount: 90000.00,
        onSuccess
      });
}

}
