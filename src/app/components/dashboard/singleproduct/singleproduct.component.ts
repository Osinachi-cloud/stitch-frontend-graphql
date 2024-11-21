import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMeasurementService } from 'src/app/services/body-measurement.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Products, ProductVariationRequest } from 'src/app/types/Type';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent {

  showModal = false;
  showUserFormModal = false;
  showTerminalFormModal = false;
  productVariations = [];
  selectedColor: string | null = null;
  selectedSleeve: string | null = null;
  selectedMeasurement: string | null = null;
  bodyMeasurements: any[] 
  selectedProductVariation: ProductVariationRequest = {
    color:"",
    sleeveType:"",
    measurement:""
  }

  constructor(
              private cartService: CartService, 
              private bodyMeasurementService: BodyMeasurementService,
              private route: ActivatedRoute, 
              private productService: ProductService, 
              private router: Router
            ) {

  }

  productId = this.route.snapshot.params['productId'];
  showLoginOptionModal = false;


  product: Products = {
    productId: this.productId,
    page: 0,
    size: 1,
    vendorId: null,
    category: null,
    status: null
  }
  singleProduct: any = {};
  count: number = 1;
  totalAmount: number = 0;

  ngOnInit() {
    console.log(this.productId);
    this.getSingleProduct();
    this.totalAmount = this.count * this.singleProduct.amount;
    this.getBodyMeasurements();
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSleeve(sleeve: string) {
    this.selectedSleeve = sleeve;
  }

  // selectMeasurement(measurement: string) {
  //   this.selectedMeasurement = measurement;
  // }

  selectMeasurement(measurement: string) {
    this.selectedMeasurement = measurement;
    console.log('Selected Measurement:', this.selectedMeasurement);
}

  getSingleProduct() {
    this.productService.getProductByProductId(this.productId).subscribe({
      next: (res: any) => {
        this.singleProduct = res.data.getProductByProductId;

         this.productVariations = this.singleProduct.productVariation;

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  // addCount(productVariationRequest: any) {
  //   if (this.cartService.userAuthenticated) {
  //     this.cartService.addProductCart(this.productId).subscribe({
  //       next: (res: any) => {
  //         console.log("called endpoint api 2");
  //         console.log(res);
  //         if (this.count < this.singleProduct.quantity) {
  //           this.count = this.count + 1;
  //           this.totalAmount = this.count * this.singleProduct.amount;
  //         }
  //       },
  //       error: (err: any) => {
  //         console.error(err);
  //       }
  //     })
  //   }else{
  //     this.toggleTerminalFormModal();
  //     console.log("entered exception");
  //   }
  // }

  addCount(productVariationRequest: any) {
    console.log({productVariationRequest}, this.selectedProductVariation)
    if(!productVariationRequest || productVariationRequest == null){
        alert("continue to product variation before proceeding");
    }
    if (this.cartService.userAuthenticated) {
      this.cartService.addProductCartWithVariation(this.productId, this.selectedProductVariation).subscribe({
        next: (res: any) => {
          console.log("called endpoint api 2");
          console.log(res);
          if (this.count < this.singleProduct.quantity) {
            this.count = this.count + 1;
            this.totalAmount = this.count * this.singleProduct.amount;
          }
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }else{
      this.toggleTerminalFormModal();
      console.log("entered exception");
    }
  }

  getBodyMeasurements(){
    this.bodyMeasurementService.getBodyMeasurementByUser().subscribe(
      {
        next:(res: any)=> {
          console.log(res);
          this.bodyMeasurements = res.data.getBodyMeasurementByUser
        },
        error:(error: any)=> {
          console.log(error);
        }
      }
    )
  }

  addToCart() {
    console.log(this.cartService.userAuthenticated);
    if (this.cartService.userAuthenticated) {


      if (!this.selectedColor || !this.selectedSleeve || !this.selectedMeasurement) {
        alert('Please select a color and sleeve style before adding to cart.');
        return;
      }
  
      const selectedProductVariation = {
        color: this.selectedColor,
        sleeveType: this.selectedSleeve,
        measurement: this.selectedMeasurement,
      };

      this.selectedProductVariation = selectedProductVariation
      console.log(this.selectedProductVariation);


      this.addCount(this.selectedProductVariation);
      this.toggleProductVariationModal();
      this.router.navigate(["dashboard/cart"])
      console.log("hello world");
    }else{
      this.toggleTerminalFormModal();
      console.log("entered exception")
    }
    this.toggleProductVariationModal();
  }

  toggleTerminalFormModal(){
    this.showLoginOptionModal = !this.showLoginOptionModal;
  };

  removeCount() {
    this.cartService.deleteProductCart(this.productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        console.log(res);
        if (this.count > 1) {
          this.count = this.count - 1;
          this.totalAmount = this.count * this.singleProduct.amount;
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleUserFormModal() {
    this.showModal = !this.showModal;
    this.showUserFormModal = !this.showUserFormModal;
  }

  toggleProductVariationModal() {
    this.showModal = !this.showModal;
    this.showTerminalFormModal = !this.showTerminalFormModal;
  }



}
