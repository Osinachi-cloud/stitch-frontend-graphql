import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/types/Type';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent {

  constructor(private cartService: CartService, private route: ActivatedRoute, private productService: ProductService, private router: Router) {

  }

  productId = this.route.snapshot.params['productId'];
  showLoginOptionModal = false;


  product: Products = {
    productId: this.productId,
    page: 0,
    size: 1,
    vendorId: null,
    category: null,
    status: null
  }
  singleProduct: any = {};
  count: number = 1;
  totalAmount: number = 0;

  ngOnInit() {
    console.log(this.productId);
    this.getSingleProduct();
    this.totalAmount = this.count * this.singleProduct.amount;
  }

  getSingleProduct() {
    this.productService.getProductByProductId(this.productId).subscribe({
      next: (res: any) => {
        this.singleProduct = res.data.getProductByProductId;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addCount() {
    if (this.cartService.userAuthenticated) {
      this.cartService.addProductCart(this.productId).subscribe({
        next: (res: any) => {
          console.log("called endpoint api 2");
          console.log(res);
          if (this.count < this.singleProduct.quantity) {
            this.count = this.count + 1;
            this.totalAmount = this.count * this.singleProduct.amount;
          }
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }else{
      this.toggleTerminalFormModal();
      console.log("entered exception");
    }
  }

  addToCart() {
    console.log(this.cartService.userAuthenticated);
    if (this.cartService.userAuthenticated) {
      this.addCount();
      this.router.navigate(["dashboard/cart"])
      console.log("hello world");
    }else{
      this.toggleTerminalFormModal();
      console.log("entered exception")
    }
  }

  toggleTerminalFormModal(){
    this.showLoginOptionModal = !this.showLoginOptionModal;
  };

  removeCount() {
    this.cartService.deleteProductCart(this.productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        console.log(res);
        if (this.count > 1) {
          this.count = this.count - 1;
          this.totalAmount = this.count * this.singleProduct.amount;
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
