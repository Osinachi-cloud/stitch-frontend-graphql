import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service'; 
import { ProductService } from 'src/app/services/product.service';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { Products } from 'src/app/types/Type';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products = [
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    
  ];
  styles = [
    {name: 'Corporates', imageUrl: 'assets/images/corporate.png'},
    {name: 'Natives', imageUrl: 'assets/images/Agbada (2).png'},
    {name: 'Casuals', imageUrl: 'assets/images/Casual.png'}
  ]; 

  categories = [
    {name: 'Men', imageUrl: 'assets/images/Men.png'},
    {name: 'Women', imageUrl: 'assets/images/Women.png'},
    {name: 'Couples', imageUrl: 'assets/images/Couples.png'},
    {name: 'Kids', imageUrl: 'assets/images/Kids.png'},
    {name: 'Family', imageUrl: 'assets/images/Family.png'},
    {name: 'Aso-Ebi', imageUrl: 'assets/images/Aso-Ebi.png'}
  ]
  tailors = [
    {name: 'Ed Johnson', description: 'Brief Introduction', imageUrl: 'assets/images/Ed.png'},
    {name: 'John Yakubu', description: 'Brief Introduction', imageUrl: 'assets/images/John.png'},
    {name: 'Micheal Olabisi', description: 'Brief Introduction', imageUrl: 'assets/images/Michael.png'},
    {name: 'Frederick Williams', description: 'Brief Introduction', imageUrl: 'assets/images/Williams.png'},
    {name: 'Abosode Temitope', description: 'Brief Introduction', imageUrl: 'assets/images/Temitope.png'},
    {name: 'Ezekiel Chidera', description: 'Brief Introduction', imageUrl: 'assets/images/Chidera.png'},
    
  ]
  blogs = [
    {name: 'How to style your dress to fit your taste!', description: 'How to style your dress to fit your taste!How to style your dress to fit your taste!How to style your dress to fit your taste!', imageUrl: 'assets/images/Blog.png'},
    {name: 'How to style your dress to fit your taste!', description: 'How to style your dress to fit your taste!How to style your dress to fit your taste!How to style your dress to fit your taste!', imageUrl: 'assets/images/Blog1.png'},
  ]

  loading: boolean = false;
  product: Products = {
    vendorId: "1234",
    page:0,
    size:10,
    productId:null,
    status:null,
    category:null
  }

  productList : any [] = [];

  constructor(private productService: ProductService,
              private productLikeService: ProductlikesService,
              private router: Router
  ){
  }

  totalNumberOfProducts: number = 0;
  skeletonItems = Array(10).fill(0); // adjust the number of skeleton items to match your product list length
  // loading = true;


  ngOnInit(){
    this.getProducts();
  }

  getProductsx(){
    this.loading = true;
    console.log("got to product list");
    this.productService.getProducts(this.product).subscribe({
      next : (res: any) => {
        this.productList = res.data.getAllProductsBy.data;
        this.totalNumberOfProducts = res.data.getAllProductsBy.total;
          console.log(res);
          this.loading = false;
      },
      error : (err: any) => {
        console.error(err);
        this.loading = false;
      }

    })
  }

  getProducts(){
    this.loading = true;
    console.log("got to product list");
    this.productService.getProducts(this.product).subscribe({
      next : (res: any) => {
        this.productList = [...this.productList, ...res.data.getAllProductsBy.data]; // append new data to the existing list
        this.totalNumberOfProducts = res.data.getAllProductsBy.total;
        console.log(res);
        this.loading = false; // set loading to false
      },
      error : (err: any) => {
        console.error(err);
        this.loading = false; // set loading to false
      }
    })
  }

  previousPage(){
    console.log("got to previousPage");

    if(this.product.page >= 1){
      this.product.page = this.product.page - 1;
      this.getProducts();
    } 
  }

  addProductLikes(productId: string){ 
    this.productLikeService.addProductLikes(productId).subscribe({
      next : (res: any) => {
          console.log(res);
      },
      error : (err: any) => {
        console.error(err);
      }

    })
  }

  numOfPage(): number{
      return Math.ceil(this.totalNumberOfProducts / this.product.size);
  }

  nextPage(){
    console.log("got to next page");

    if(this.product.page <  this.numOfPage() - 1 ){
      this.product.page = this.product.page + 1;
      this.getProducts();
    }
  }

  showProductDetails(productId: any): void {
    console.log(productId);
    this.router.navigate(['products', productId]); 
  }

  @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && !this.loading) {
  //     this.product.page++;
  //     this.getProducts();
  //   }
  // }

  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && !this.loading) {
      this.loading = true; // set loading to true
      this.product.page++;
      this.getProducts();
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
