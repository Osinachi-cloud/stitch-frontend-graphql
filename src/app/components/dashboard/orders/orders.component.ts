import { Component } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  customersOrder: any[] = []

  constructor(
    private clientService: ClientsService) {}

  ngOnInit(): void {
    this.getTerminals();
    this.getUsers();
    this.getUsersList();
    this.getTerminal1();
    this.getTerminalDetail();
    this.getTransactions();
  }

  getTerminals(){
    this.clientService.getTerminals().subscribe({
      next:(items: any)=>{
          this.customersOrder = items;
      },
      error:(items:any)=>{

      }
    })
  }









  users: any[] = []

  getUsers(){
    this.clientService.getUsers().subscribe({
      next:(items: any)=>{
          this.users = items;
      },
      error:(items:any)=>{

      }
    })
  }

  
  usersList: any[] = []

  getUsersList(){
    this.clientService.getUsersList().subscribe({
      next:(items: any)=>{
          this.usersList = items;
      },
      error:(items:any)=>{

      }
    })
  }

  getRatings(num:number): number []{
    const ratings: number[] = [];
    for(let i = 0; i < num; i++){
      ratings.push(i);
    }
    return ratings;
  }



  terminalData1 : any[] = [];

  getTerminal1(){
    this.clientService.getTerminal1().subscribe({
      next:(items: any)=>{
          this.terminalData1 = items;
      },
      error:(items:any)=>{

      }
    })
  }


  terminal : any = {};

  getTerminalDetail(){
    this.clientService.getTerminal().subscribe({
      next:(item: any)=>{
        this.terminal = item;
      },
      error:(err: any)=>{
          console.log(err);
      }
    })
  }


  transactions : any = {};

  getTransactions(){
    this.clientService.getTransactions().subscribe({
      next:(item: any)=>{
        this.transactions = item;
      },
      error:(err: any)=>{
          console.log(err);
      },
      complete: () => {
        console.info("Get Transactions Implementation!");
      }
    })
  }






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
