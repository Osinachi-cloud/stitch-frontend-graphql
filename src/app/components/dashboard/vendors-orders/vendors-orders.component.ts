import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ProductOrder, ProductOrderRequest, ProductOrderStatistics } from 'src/app/types/Type';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';
import { NgToastService } from 'ng-angular-popup';

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
  updateLoading = false;
  showOrderModal = false;
  orderRef: string = "";
  orderDetail: any = {};
  showBodyMeasurementModal: boolean = false;
  updateOrderBtnText = "";

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

  productOrderStatistics: ProductOrderStatistics = {
    allOrdersCount: 0,
    processingOrdersCount: 0,
    cancelledOrdersCount: 0,
    failedOrdersCount: 0,
    completedOrdersCount: 0,
    inTransitOrdersCount:0,
    paymentCompletedCount: 0
  }

  status = {
    failed: "FAILED",
    // completed: "COMPLETED",
    processing: "PROCESSING",
    rejected: "REJECTED",
    inTransit: "IN_TRANSIT",
    paid: "PAYMENT_COMPLETED",
    started: "VENDOR_PROCESSING_START",
    completed: "VENDOR_PROCESSING_COMPLETED",
    all: null
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showFailureResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  constructor(private orderService: OrderService, 
    private toast: NgToastService,

  ) { }

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

  getOrderById() {
    console.log("got to order");
    // this.isLoading = false;
    this.orderService.getOrderByOrderId(this.orderRef).subscribe({
      next: (response: any) => {
        console.log(response);
        // this.isLoading = true;
        this.orderDetail = response?.data.getOrderByOrderId;
        // console.log(this.orderDetail);
      },
      error: (items: any) => {
        // this.isLoading = true;
      }
    })
  }

  toggleOrderModal(id: string): void {
    // this.showModal = !this.showModal;
    this.orderRef = id;
    console.log("order id : " + this.orderRef);
    this.getOrderById();
    this.showOrderModal = !this.showOrderModal;
  }

  toggleBodyMeasurementModal(orderId: string) {
    this.orderRef = orderId;
    console.log("order id : " + this.orderRef);
    this.getOrderById();
    this.showBodyMeasurementModal = !this.showBodyMeasurementModal;
  }

  updateProductOrder(orderId: string) {
    this.updateLoading = true;
    let orderStatus = "";
    console.log("res", orderId);

    switch (this.orderDetail?.status) {
      case 'PAYMENT_COMPLETED':
        orderStatus = 'VENDOR_PROCESSING_START';
        this.updateOrderBtnText = "Accept Order";
        break;
      case 'VENDOR_PROCESSING_START':
        orderStatus = 'VENDOR_PROCESSING_COMPLETED';
        this.updateOrderBtnText = "Order Ready";
        break;
      case 'VENDOR_PROCESSING_COMPLETED':
        orderStatus = 'IN_TRANSIT';
        break;
      case 'IN_TRANSIT':
        orderStatus = 'PAYMENT_COMPLETED';
        break;
      default:
        console.log('Sorry, we are out of ' + ' ');
        this.updateOrderBtnText = "Next";

    }

    let productOrderRequest: ProductOrderRequest = {
      status: orderStatus,
      orderId: orderId
    }
    this.orderService.updateProductOrder(productOrderRequest).subscribe({
      next: (res: any) => {
        this.updateLoading = false;
        this.showSuccessResponse("Update Order", "order successfully updated", 3000)

        console.log({ res });

        window.location.reload();
      },
      error: (err: any) => {
        console.log({ err });
      }
    });
  }




}