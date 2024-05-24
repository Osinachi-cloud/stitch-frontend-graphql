import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent {

  constructor(private cartService : CartService){

  }

  product: any  = {
    productId:"1"
  }
 
  addCount(productId: string) {
    this.cartService.addProductCart(productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        window.location.reload();
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  removeCount(productId: string) {
    this.cartService.deleteProductCart(productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        console.log(res);
        window.location.reload();

      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
