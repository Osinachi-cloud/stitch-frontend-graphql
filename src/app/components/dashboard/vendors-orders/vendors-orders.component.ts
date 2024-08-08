import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ProductOrder, ProductOrderRequest, ProductOrderStatistics } from 'src/app/types/Type';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-vendors-orders',
  templateUrl: './vendors-orders.component.html',
  styleUrls: ['./vendors-orders.component.scss']
})
export class VendorsOrdersComponent {
  vendorsOrder: any[] = []
  orderTotal: number = 0;
  numOfPages: number = 0;
  isLoading = false;
  showOrderModal = false;
  orderRef:string = "";
  orderDetail: any = {};
  showBodyMeasurementModal: boolean = false;

  productOrderRequest: ProductOrder = {
    productId: null,
    customerId: UtilService.getUserDetails().emailAddress,
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
    this.getVendorOrderStats();
    this.fetchVendorOrdersBy();
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
    this.fetchVendorOrdersBy();

  }

  getVendorOrderStats(): void {
    this.orderService.getVendorOrderStats().subscribe({
      next: (statsData: any) => {
        this.productOrderStatistics = statsData.data.getProductOrderStatsByVendor;
        console.log(statsData);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  fetchVendorOrdersBy(): void {
    this.isLoading = false;
    this.orderService.fetchVendorOrdersBy(this.productOrderRequest).subscribe({
      next: (items: any) => {
        this.vendorsOrder = items?.data?.fetchVendorOrdersBy?.data;
        this.orderTotal = items?.data?.fetchVendorOrdersBy?.total;
        this.getNumberOfPages(this.orderTotal);
        console.log(items?.data?.fetchVendorOrdersBy?.data);
        this.isLoading = true;

      },
      error: (error: any) => {
        this.isLoading = true;
        console.log(error);
      }
    })
  }

  nextPage(): void {
    if (this.productOrderRequest.page + 1 < this.numOfPages) {
      this.productOrderRequest.page = this.productOrderRequest.page + 1;
      this.fetchVendorOrdersBy();
    }
  }

  previousPage(): void {
    if (this.productOrderRequest.page + 1 > 1) {
      this.productOrderRequest.page = this.productOrderRequest.page - 1;
      this.fetchVendorOrdersBy();
    }
  }

  getSize(size: number): void {
    this.productOrderRequest.size = size;
    this.fetchVendorOrdersBy();
  }

  getRatings(num: number): number[] {
    const ratings: number[] = [];
    for (let i = 0; i < num; i++) {
      ratings.push(i);
    }
    return ratings;
  }

  toggleReceiptModal(id: string): void {
    // this.showModal = !this.showModal;
    this.orderRef = id;
    console.log("order id : " +this.orderRef);
    this.getOrderById();
    this.showOrderModal = !this.showOrderModal;

  }

  getOrderById(){
    // this.isLoading = false;
    this.orderService.getOrderByOrderId(this.orderRef).subscribe({
      next:(response: any) => {
        // console.log(response);
        // this.isLoading = true;
          this.orderDetail = response?.data.getOrderByOrderId;
        // console.log(this.orderDetail);
      },
      error:(items:any)=>{
        // this.isLoading = true;
      }
    })
  }



  toggleBodyMeasurementModal(orderId:string){
    this.orderRef = orderId;
    console.log("order id : " +this.orderRef);
    this.getOrderById();
    this.showBodyMeasurementModal = !this.showBodyMeasurementModal;
  }

  updateProductOrder(orderId: string){
    console.log("res", orderId);
    let productOrderRequest: ProductOrderRequest = {
      status:"VENDOR_PROCESSING_START",
      orderId:orderId
    }
    this.orderService.updateProductOrder(productOrderRequest).subscribe({
      next: (res: any) => {
        console.log({res});
        // window.location.reload();
      },
      error: (err: any) => {
        console.log({err});
      }
    });
  }




}