import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ProductOrder } from 'src/app/types/Type';
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

  status = {
    failed: "FAILED",
    completed: "COMPLETED",
    processing: "PROCESSING",
    rejected: "REJECTED",
    all: null
  }

  constructor(
    // private clientService: ClientsService, 
    private orderService: OrderService) {}

  ngOnInit(): void {
    this.getCustomerOrders();
  }

  getNumberOfPages(orderTotal : number): void {
    console.log(orderTotal);
    console.log(this.productOrderRequest.size);
    if(orderTotal % this.productOrderRequest.size == 0){
      this.numOfPages = orderTotal / this.productOrderRequest.size;
    }else{
    this.numOfPages = 1 +  Math.floor(orderTotal / this.productOrderRequest.size);
    }
  }

  filterByStatus(status: string | null){
    this.productOrderRequest.status = status;
    this.getCustomerOrders();
  }

  getCustomerOrders(): void{
    this.orderService.getCustomerOrders(this.productOrderRequest).subscribe({
      next:(items: any)=>{
        this.customersOrder = items.data.fetchCustomerOrdersBy.data;
        this.orderTotal = items.data.fetchCustomerOrdersBy.total;
        this.getNumberOfPages(this.orderTotal);
        console.log(items.data.fetchCustomerOrdersBy.data);
    },
      error:(error:any)=>{
          console.log(error);
      }
    })
  }

  nextPage(): void {
    if(this.productOrderRequest.page + 1 < this.numOfPages){
      this.productOrderRequest.page = this.productOrderRequest.page + 1;
      this.getCustomerOrders();
    }
  }

  previousPage(): void {
    if(this.productOrderRequest.page + 1 > 1){
      this.productOrderRequest.page = this.productOrderRequest.page - 1;
      this.getCustomerOrders();
    }
  }

  getSize(size: number): void{
    this.productOrderRequest.size = size;
    this.getCustomerOrders();
  }

  users: any[] = []

  usersList: any[] = []

  getRatings(num:number): number []{
    const ratings: number[] = [];
    for(let i = 0; i < num; i++){
      ratings.push(i);
    }
    return ratings;
  }

  terminalData1 : any[] = [];

  terminal : any = {};

  transactions : any = {};


  name = 'Angular';
  // view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

    view: any[] | any = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme : any = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  // data goes here
public single = [
  {
    "name": "China",
    "value": 2243772
  },
  {
    "name": "USA",
    "value": 1126000
  },
  {
    "name": "Norway",
    "value": 296215
  },
  {
    "name": "Japan",
    "value": 257363
  },
  {
    "name": "Germany",
    "value": 196750
  },
  {
    "name": "France",
    "value": 204617
  }
];


public multi = [
  {
    "name": "China",
    "series": [
      {
        "name": "2018",
        "value": 2243772
      },
      {
        "name": "2017",
        "value": 1227770
      }
    ]
  },
  {
    "name": "USA",
    "series": [
      {
        "name": "2018",
        "value": 1126000
      },
      {
        "name": "2017",
        "value": 764666
      }
    ]
  },
  {
    "name": "Norway",
    "series": [
      {
        "name": "2018",
        "value": 296215
      },
      {
        "name": "2017",
        "value": 209122
      }
    ]
  },
  {
    "name": "Japan",
    "series": [
      {
        "name": "2018",
        "value": 257363
      },
      {
        "name": "2017",
        "value": 205350
      }
    ]
  },
  {
    "name": "Germany",
    "series": [
      {
        "name": "2018",
        "value": 196750
      },
      {
        "name": "2017",
        "value": 129246
      }
    ]
  },
  {
    "name": "France",
    "series": [
      {
        "name": "2018",
        "value": 204617
      },
      {
        "name": "2017",
        "value": 149797
      }
    ]
  }
];

  
}
