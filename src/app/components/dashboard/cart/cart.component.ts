import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PageRequest } from 'src/app/types/Type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: any[] = [];

  sumCartAmount: number  = 0;

  pageRequest: PageRequest = {
    page: 0,
    size: 30
  }

  constructor(private cartService: CartService, private router: Router) {
  }

  count: number = 1;

  ngOnInit() {
    this.getAllCartItems();
    this.sumAmountByQuantityByCustomerId();
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

  sumAmountByQuantityByCustomerId(){
    console.log("got to the cart box");
    this.cartService.sumAmountByQuantityByCustomerId().subscribe({
      next : (res: any) => {
        console.log(res)
        this.sumCartAmount = res.data.sumAmountByQuantityByCustomerId;
      }, 
      error : (err: any) => {
        console.log(err);
      }

    })
  }

  backToShopping(){
    this.router.navigate(["/dashboard"])
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next : (res: any) => {
        window.location.reload();
        this.getAllCartItems();
      },
      error : (err: any) => {

      }
    })
  }

}
