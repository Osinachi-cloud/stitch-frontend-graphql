import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
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

  constructor(private inventoryService: InventoryService,
    private router: Router,

  ) {
  }


  productOrderRequest = {
    orderId: ""
  }

  productRequest: Products = {
    // productId: null,
    // status: "",
    // productCategory: "",
    vendorId: UtilService.getUserDetails().vendorId,
    page: 0,
    size: 10,
    productId: null,
    category: null

  }


  // getProductList(){
  //   this.inventoryService.getProductsByVendorId(this.product).subscribe({
  //     next:(items: any)=>{
  //         this.productList = items.data.getProductsByVendorId.data;
  //         console.log(items);
  //     },
  //     error:(items:any)=>{

  //     }
  //   })
  // }

  // getProductList() {
  //   this.inventoryService.getProductsByVendorId().subscribe({
  //     next: (items: any) => {
  //       this.productList = items;
  //       console.log(items);
  //     },
  //     error: (items: any) => {

  //     }
  //   })
  // }

  ngOnInit() {
    this.getVendorsProductInventory();
  }
  getCustomerOrders() {

  }

  navigateToProductPage() {
    this.router.navigate(['dashboard/add-product'])
  }

  getVendorsProductInventory(): void {
    this.inventoryService.getProductsBy(this.productRequest).subscribe({
      next: (items: any) => {
        this.productList = items.data.getAllProductsBy.data;
        this.productTotal = items.data.getAllProductsBy.total;
        this.getNumberOfPages(this.productTotal);
        // console.log(items.data.fetchCustomerOrdersBy.data);
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
    this.getCustomerOrders();

  }

  nextPage(): void {
    if (this.productRequest.page + 1 < this.numOfPages) {
      this.productRequest.page = this.productRequest.page + 1;
      this.getCustomerOrders();
    }
  }

  previousPage(): void {
    if (this.productRequest.page + 1 > 1) {
      this.productRequest.page = this.productRequest.page - 1;
      this.getCustomerOrders();
    }
  }

  getSize(size: number): void {
    this.productRequest.size = size;
    this.getCustomerOrders();
  }

  getRatings(num: number): number[] {
    const ratings: number[] = [];
    for (let i = 0; i < num; i++) {
      ratings.push(i);
    }
    return ratings;
  }

}
