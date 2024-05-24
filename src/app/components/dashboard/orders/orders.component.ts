import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ProductOrder, ProductOrderStatistics } from 'src/app/types/Type';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  customersOrder: any[] = []
  orderTotal: number = 0;
  numOfPages: number = 0;

  productOrderRequest: ProductOrder = {
    productId: null,
    customerId: UtilService.getUserDetails().customerId,
    status: null,
    orderId: null,
    productCategory: null,
    vendorId: null,
    page: 0,
    size: 10
  }

  productOrderStatistics : ProductOrderStatistics ={
    allOrdersCount: 0,
    processingOrdersCount:0,
    cancelledOrdersCount:0,
    failedOrdersCount:0,
    completedOrdersCount:0,
}

  status = {
    failed: "FAILED",
    completed: "COMPLETED",
    processing: "PROCESSING",
    rejected: "REJECTED",
    all: null
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderStats();
    this.getCustomerOrders();
  }

  getNumberOfPages(orderTotal: number): void {
    console.log(orderTotal);
    console.log(this.productOrderRequest.size);
    if (orderTotal % this.productOrderRequest.size == 0) {
      this.numOfPages = orderTotal / this.productOrderRequest.size;
    } else {
      this.numOfPages = 1 + Math.floor(orderTotal / this.productOrderRequest.size);
    }
  }

  filterByStatus(status: string | null) {
    console.log("got to status");
    this.productOrderRequest.status = status;
    this.productOrderRequest.orderId = null;
    this.getCustomerOrders();

  }

  getOrderStats(): void {
    this.orderService.getOrderStats().subscribe({
      next: (statsData: any) => {
        this.productOrderStatistics = statsData.data.getProductOrderStatsByCustomer;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getCustomerOrders(): void {
    this.orderService.getCustomerOrders(this.productOrderRequest).subscribe({
      next: (items: any) => {
        this.customersOrder = items.data.fetchCustomerOrdersBy.data;
        this.orderTotal = items.data.fetchCustomerOrdersBy.total;
        this.getNumberOfPages(this.orderTotal);
        console.log(items.data.fetchCustomerOrdersBy.data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  nextPage(): void {
    if (this.productOrderRequest.page + 1 < this.numOfPages) {
      this.productOrderRequest.page = this.productOrderRequest.page + 1;
      this.getCustomerOrders();
    }
  }

  previousPage(): void {
    if (this.productOrderRequest.page + 1 > 1) {
      this.productOrderRequest.page = this.productOrderRequest.page - 1;
      this.getCustomerOrders();
    }
  }

  getSize(size: number): void {
    this.productOrderRequest.size = size;
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