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

  constructor(private inventoryService: InventoryService, private router: Router){
  }

  productList: any[] = []; 

  productOrderRequest = {
    orderId:""
  }

  product : Products = {
    // productId: null,
    // status: "",
    // productCategory: "",
    vendorId: UtilService.getUserDetails().vendorId,
    page: 0,
    size: 10,
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

  getProductList(){
    this.inventoryService.getProductsByVendorId().subscribe({
      next:(items: any)=>{
          this.productList = items;
          console.log(items);
      },
      error:(items:any)=>{

      }
    })
  }

  ngOnInit(){
    this.getProductList();
  }
  getCustomerOrders(){

  }

  navigateToProductPage(){
    this.router.navigate(['dashboard/add-product'])
  }

}
