import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  constructor(private inventoryService: InventoryService, private router: Router){
  }

  usersList: any[] = []; 
  productOrderRequest = {
    orderId:""
  }


  getUsersList(){
    this.inventoryService.getUsersList().subscribe({
      next:(items: any)=>{
          this.usersList = items;
      },
      error:(items:any)=>{

      }
    })
  }

  ngOnInit(){
    this.getUsersList();
  }
  getCustomerOrders(){

  }

  navigateToProductPage(){
    this.router.navigate(['dashboard/add-product'])
  }

}
