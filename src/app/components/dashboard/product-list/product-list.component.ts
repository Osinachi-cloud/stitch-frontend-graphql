import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { TokenService } from 'src/app/services/token.service';
import { Products } from 'src/app/types/Type';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  loading: boolean = false;
  showLoginOptionModal = false;
  product: Products = {
    vendorId: "1234",
    page: 0,
    size: 12,
    productId: null,
    status: null,
    category: null
  }

  likedColor: string = 'liked-color';
  defaultColor: string = 'default-color';
  productList: any[] = [];

  constructor(private productService: ProductService,
    private productLikeService: ProductlikesService,
    private router: Router,
    private toast: NgToastService

  ){
  }

  minValue: any = 100;
  maxValue: any = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  totalNumberOfProducts: number = 0;
  skeletonItems = Array(10).fill(0);

  ngOnInit() {
    this.getProductsByUserType();
  }

  getProductsByUserType() {
    console.log(TokenService.isTokenExpired(TokenService.getToken()), TokenService.getToken())
    if (TokenService.getToken() && !TokenService.isTokenExpired(TokenService.getToken())) {
      console.log("is authenticated");
      console.log(TokenService.isTokenExpired(TokenService.getToken()), TokenService.getToken())
      this.getProductsForAuthenticatedUser();

    } else {
      console.log("is not authenticated");
      this.getProducts();
    }
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  getProductsx() {
    this.loading = true;
    console.log("got to product list");
    this.productService.getProducts(this.product).subscribe({
      next: (res: any) => {
        this.productList = res.data.getAllProductsBy.data;
        this.totalNumberOfProducts = res.data.getAllProductsBy.total;
        console.log(res);
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }

    })
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

  getProductsForAuthenticatedUser() {
    console.log("authenticted")
    this.loading = true;
    console.log("got to product list");
    this.productService.getAllProductsByAuth(this.product).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.productList = [...this.productList, ...res.data.getAllProductsByAuth.data]; // append new data to the existing list
        this.totalNumberOfProducts = res.data.getAllProductsByAuth.total;
        console.log(res);
        this.loading = false; 
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false; 
      }
    })
  }

  previousPage() {
    console.log("got to previousPage");

    if (this.product.page >= 1) {
      this.product.page = this.product.page - 1;
      this.getProducts();
    }
  }

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

  toggleTerminalFormModal() {
    this.showLoginOptionModal = !this.showLoginOptionModal;
  };

  numOfPage(): number {
    return Math.ceil(this.totalNumberOfProducts / this.product.size);
  }

  nextPage() {
    console.log("got to next page");

    if (this.product.page < this.numOfPage() - 1) {
      this.product.page = this.product.page + 1;
      this.getProducts();
    }
  }

  showProductDetails(productId: any): void {
    console.log(productId);
    this.router.navigate(['products', productId]);
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && !this.loading) {
      if (this.productList.length < this.totalNumberOfProducts) {
        this.loading = true;
        this.product.page++;
        this.getProducts();
      }
    }
  }



  //   @ViewChild('scrollContainer') scrollContainer: ElementRef;

  // loading = false;
  // product: Products = {
  //   vendorId: "1234",
  //   page: 0,
  //   size: 10,
  //   productId: null,
  //   status: null,
  //   category: null
  // }

  // productList: any[] = [];

  // constructor(private productService: ProductService,
  //   private productLikeService: ProductlikesService,
  //   private router: Router
  // ) { }

  // totalNumberOfProducts: number = 0;

  // ngOnInit() {
  //   this.getProducts();
  // }

  // getProducts() {
  //   this.loading = true;
  //   console.log("got to product list");
  //   this.productService.getProducts(this.product).subscribe({
  //     next: (res: any) => {
  //       this.productList = [...this.productList,...res.data.getAllProductsBy.data];
  //       this.totalNumberOfProducts = res.data.getAllProductsBy.total;
  //       console.log(res);
  //       this.loading = false;
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //       this.loading = false;
  //     }
  //   })
  // }

  // previousPage() {
  //   console.log("got to previousPage");

  //   if (this.product.page >= 1) {
  //     this.product.page = this.product.page - 1;
  //     this.getProducts();
  //   }
  // }

  // addProductLikes(productId: string) {
  //   this.productLikeService.addProductLikes(productId).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     }
  //   })
  // }

  // numOfPage(): number {
  //   return Math.ceil(this.totalNumberOfProducts / this.product.size);
  // }

  // nextPage() {
  //   console.log("got to next page");

  //   if (this.product.page < this.numOfPage() - 1) {
  //     this.product.page = this.product.page + 1;
  //     this.getProducts();
  //   }
  // }

  // showProductDetails(productId: any): void {
  //   console.log(productId);
  //   this.router.navigate(['products', productId]);
  // }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: any): void {
  //   const scrollPosition = event.target.scrollTop;
  //   const containerHeight = this.scrollContainer.nativeElement.offsetHeight;
  //   const scrollHeight = this.scrollContainer.nativeElement.scrollHeight;

  //   if (scrollPosition + containerHeight >= scrollHeight - 2 &&!this.loading) {
  //     this.product.page++;
  //     this.getProducts();
  //   }
  // }
}
