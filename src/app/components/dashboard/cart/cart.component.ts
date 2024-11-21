import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { InitializeTransactionResponse, PageRequest, PaymentRequest, Products } from 'src/app/types/Type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {

  cart: any[] = [];
  cartSingleProduct: any;
  isLoading: boolean = false;
  isLoadingOrder: boolean = false;
  sumCartAmount: number = 0;
  arrProductIds: string[] = [];

  pageRequest: PageRequest = {
    page: 0,
    size: 30
  }
  selectedChannel: string;
  paymentRequest: PaymentRequest;
  initializeTransactionResponse: InitializeTransactionResponse;

  constructor(private paymentService: PaymentService,
    private cartService: CartService,
    private router: Router,
    private productLikeService: ProductlikesService,
    private toast: NgToastService,

  ) {
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }


  count: number = 1;

  ngOnInit() {
    this.getAllCartItems();
    this.sumAmountByQuantityByCustomerId();

  }

  getAllCartItems() {
    console.log("called cart endpoints");
    this.isLoading = true;
    this.cartService.getCart(this.pageRequest).subscribe({
      next: (res: any) => {
        this.isLoading = false;
  
        this.cart = res.data.getCart.data;
        this.cartSingleProduct = this.cart[0];
        console.log("cart", this.cart[0]);
        // window.location.reload();
        // this.getProductsIds(res.data.getCart.data);


      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
      }
    })

  }

  getProductsIds(carts: Products[]): string [] {
    carts.map((cart) => {
      this.arrProductIds.push(cart.productId);
    });
    return this.arrProductIds;
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

  addProductLikes(productId: string) {
    this.productLikeService.addProductLikes(productId).subscribe({
      next: (res: any) => {
        console.log(res);
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

  sumAmountByQuantityByCustomerId() {
    console.log("got to the cart box");
    this.cartService.sumAmountByQuantityByCustomerId().subscribe({
      next: (res: any) => {
        console.log(res)
        this.sumCartAmount = res.data.sumAmountByQuantityByCustomerId;
      },
      error: (err: any) => {
        console.log(err);
      }

    })
  }

  backToShopping() {
    this.router.navigate([""])
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res: any) => {
        window.location.reload();
        this.getAllCartItems();
      },
      error: (err: any) => {

      }
    })
  }

  goToOrderPage() {
    console.log(this.cartSingleProduct);
    this.isLoadingOrder = true;
    const paymentRequest: PaymentRequest = {
      amount: this.sumCartAmount,
      channel: [this.selectedChannel],
      quantity: this.cartSingleProduct?.quantity,
      productId: this.cartSingleProduct?.productId,
      vendorId: this.cartSingleProduct?.vendorId,
      color: this.cartSingleProduct?.color,
      sleeveType: this.cartSingleProduct?.sleeveType,
      bodyMeasurementTag: this.cartSingleProduct?.measurementTag,
      narration: "Great Product",
      productCategoryName: this.cartSingleProduct?.category,
     
    };
    console.log("selectedChannel", this.selectedChannel);
    if (!this.selectedChannel || this.selectedChannel == "") {
      this.isLoadingOrder = false;
      this.showFailureResponse("Login Error", "You have not selected any payment channel", 3000);
    } else {
      this.paymentService.initializePayment(paymentRequest).subscribe({
        next: (res: any) => {
          this.initializeTransactionResponse = res;
          this.isLoadingOrder = false;
          console.log({ res });
          window.location.href = res?.data?.initializePayment?.data?.authorizationUrl;
          // this.clearCart();
        }, error: (err: any) => {
          this.isLoadingOrder = false;
        }
      });
    }
  }



}
