import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { PageRequest, ProductRequest, Products } from 'src/app/types/Type';

@Component({
  selector: 'app-productlikes',
  templateUrl: './productlikes.component.html',
  styleUrls: ['./productlikes.component.scss']
})
export class ProductlikesComponent {

  isLoading: boolean = false;

  constructor(private productLikeServices: ProductlikesService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ){

  }

  pageRequest : PageRequest = {
    page:0,
    size:5
  }

  totalNumberOfLikes: number = 0;

  productLikes : any [] = [];


  ngOnInit(){
    console.log("Hello world 45");

  this.getLikedProducts();

  }
  getLikedProducts(){
    this.isLoading = true;
    console.log("called like api");
    this.productLikeServices.getAllProductLikes(this.pageRequest).subscribe({
      next: (res: any) => {
      console.log("called like api 2");
        this.isLoading = false;
        console.log(res.data.getAllProductLikes.data);
        this.productLikes = res.data.getAllProductLikes.data;
        this.totalNumberOfLikes = res.data.getAllProductLikes.total;
        this.cdr.detectChanges();

      }, 
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
      }
    })

  }
  getSize(val : number){

  }

  addCount(productId: string) {
    this.cartService.addProductCart(productId).subscribe({
      next: (res: any) => {
        console.log("called endpoint api 2");
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }



  previousPage(){
    if(this.pageRequest.page >= 1){
      this.pageRequest.page = this.pageRequest.page - 1;
      this.getLikedProducts();
    } 
  }

  numOfPage(): number{
      return Math.ceil(this.totalNumberOfLikes / this.pageRequest.size);
  }

  nextPage(){
    if(this.pageRequest.page <  this.numOfPage() - 1 ){
      this.pageRequest.page = this.pageRequest.page + 1;
      this.getLikedProducts();
    }
  }

  removeLikes(productId: string){
    this.productLikeServices.deleteProductLike(productId).subscribe({
      next: (res: any) => {
          console.log(res);
          // this.getLikedProducts(this.pageRequest);
          this.refreshPage();
      },
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  refreshPage() {
    this.getLikedProducts(); 
    window.location.reload();
    this.cdr.detectChanges(); 
  }

}
