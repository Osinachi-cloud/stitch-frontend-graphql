import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PageRequest } from 'src/app/types/Type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: any[] = [];

  pageRequest: PageRequest = {
    page: 0,
    size: 30
  }

  constructor(private cartService: CartService) {
  }

  count: number = 1;

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    console.log("called cart endpoint");
    this.cartService.getCart(this.pageRequest).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");

        console.log(res.data.getCart.data);
        this.cart = res.data.getCart.data;
      },
      error: (err: any) => {
        console.error(err);
      }
    })

  }

  addCount(productId: string) {
    this.cartService.addProductCart(productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        window.location.reload();
        this.getAllCartItems();
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
        this.getAllCartItems();

      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  removeProduct(productId: string): void {
    this.cartService.removeEntireProductFromCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        window.location.reload();
        this.getAllCartItems();
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
