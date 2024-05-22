import { Component } from '@angular/core';
import { ProductlikesService } from 'src/app/services/productlikes.service';
import { PageRequest, Products } from 'src/app/types/Type';

@Component({
  selector: 'app-productlikes',
  templateUrl: './productlikes.component.html',
  styleUrls: ['./productlikes.component.scss']
})
export class ProductlikesComponent {

  constructor(private productLikeServices: ProductlikesService){

  }

  pageRequest : PageRequest = {
    page:0,
    size:10,
  }

  productLikes : any [] = [];


  ngOnInit(){
    console.log("Hello world 45");

  this.getLikedProducts(this.pageRequest);

  }
  getLikedProducts(pageRequest: PageRequest){
    this.productLikeServices.getAllProductLikes(pageRequest).subscribe({
      next: (res: any) => {
        console.log(res.data.getAllProductLikes.data);
        this.productLikes = res.data.getAllProductLikes.data;
      }, 
      error: (err: any) => {
        console.error(err);
      }
    })

  }

}
