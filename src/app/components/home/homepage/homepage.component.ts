import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/services/product.service';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { Products } from 'src/app/types/Type';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  totalNumberOfProducts: number = 0;
  skeletonItems = Array(10).fill(0);
  showLoginOptionModal = false;
  likedColor: string = 'liked-color';
  defaultColor: string = 'default-color';

  loading: boolean = false;

  productList: any[] = [];

  product: Products = {
    vendorId: "1234",
    page: 0,
    size: 12,
    productId: null,
    status: null,
    category: null
  }

  constructor(private productService: ProductService,
    private productLikeService: ProductlikesService,
    private router: Router,
    private toast: NgToastService

  ){
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    console.log(" not authenticted")

    this.loading = true;
    console.log("got to product list");
    this.productService.getProducts(this.product).subscribe({
      next: (res: any) => {
        this.productList = [...this.productList, ...res.data.getAllProductsBy.data]; // append new data to the existing list
        this.totalNumberOfProducts = res.data.getAllProductsBy.total;
        console.log(res);
        this.loading = false; // set loading to false
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false; // set loading to false
      }
    })
  }

  showProductDetails(productId: any): void {
    console.log(productId);
    this.router.navigate(['products', productId]);
  }

  toggleTerminalFormModal() {
    this.showLoginOptionModal = !this.showLoginOptionModal;
  };

  addProductLikes(productId: string, product: any) {
    const newProduct = { ...product, liked: !product.liked }; 
    if (this.productLikeService.userAuthenticated) {
      this.productLikeService.addProductLikes(productId).subscribe({
        next: (res: any) => {
          console.log(res);
          const index = this.productList.indexOf(product);
          if (index !== -1) {
            this.productList[index] = newProduct;
          }
          this.showSuccessResponse("Add to Like", res?.data?.addProductLikes?.message, 3000);
        },
        error: (err: any) => {
          this.showFailureResponse("Add to Like", err, 3000);
          console.error(err);
        }
      })
    } else {
      this.toggleTerminalFormModal();
      console.log("entered exception");
    }
  }


}
