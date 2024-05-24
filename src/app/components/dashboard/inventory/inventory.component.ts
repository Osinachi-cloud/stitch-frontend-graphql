import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import { Products } from 'src/app/types/Type';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  productList: any[] = [];
  productTotal: number = 0;
  numOfPages: number = 0;
  publishedMessage: string = "";

  constructor(private inventoryService: InventoryService,
    private productService: ProductService,
    private router: Router,
    private toast: NgToastService,
  
  ) { }

  productRequest: Products = {
    vendorId: UtilService.getUserDetails().vendorId,
    page: 0,
    size: 10,
    productId: null,
    category: null,
    status: null
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }

  ngOnInit() {
    this.getVendorsProductInventory();
    
    this.productService.getProducts(this.productRequest).subscribe({
      next: (res: any) =>{
          console.log("hello world 1");
          console.log(res);
      }, error: (err: any) => {
          console.log(err);
      }
    });
    console.log("hello world 2");

  }


  navigateToProductPage() {
    this.router.navigate(['dashboard/add-product'])
  }

  getVendorsProductInventory(): void {
    console.log("called general method");
    this.inventoryService.getProductsBy(this.productRequest).subscribe({
      next: (items: any) => {
        this.productList = items.data.getAllProductsBy.data;
        this.productTotal = items.data.getAllProductsBy.total;
        this.getNumberOfPages(this.productTotal);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  togglePublishProduct(productId: string): void {
    console.log("productId", productId);
    this.inventoryService.togglePublishProduct(productId).subscribe({
      next: (items: any) => {
        if (items.data.togglePublishProduct === true) {
          this.publishedMessage = "PRODUCT PUBLISHED";
          this.showSuccessResponse("Publish Status", this.publishedMessage, 3000);
          this.getVendorsProductInventory();

        } else {
          this.publishedMessage = "PRODUCT UNPUBLISHED";
          this.showSuccessResponse("Publish Status", this.publishedMessage, 3000);
          this.getVendorsProductInventory();
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getNumberOfPages(orderTotal: number): void {
    console.log(orderTotal);
    console.log(this.productRequest.size);
    if (orderTotal % this.productRequest.size == 0) {
      this.numOfPages = orderTotal / this.productRequest.size;
    } else {
      this.numOfPages = 1 + Math.floor(orderTotal / this.productRequest.size);
    }
  }

  filterByStatus(status: string | null) {
    console.log("got to status");
    this.productRequest.category = status;
    // this.productRequest.orderId = null;
    this.getVendorsProductInventory();

  }

  nextPage(): void {
    if (this.productRequest.page + 1 < this.numOfPages) {
      this.productRequest.page = this.productRequest.page + 1;
      this.getVendorsProductInventory();
    }
  }

  previousPage(): void {
    if (this.productRequest.page + 1 > 1) {
      this.productRequest.page = this.productRequest.page - 1;
      this.getVendorsProductInventory();
    }
  }

  getSize(size: number): void {
    this.productRequest.size = size;
    this.getVendorsProductInventory();
  }

  getRatings(num: number): number[] {
    const ratings: number[] = [];
    for (let i = 0; i < num; i++) {
      ratings.push(i);
    }
    return ratings;
  }

}
