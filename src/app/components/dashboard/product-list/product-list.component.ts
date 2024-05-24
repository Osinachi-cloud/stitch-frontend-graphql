import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service'; 


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products = [
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    { name: 'Pattern Agbada 3-piece', description: 'Short description of product', price: '₦140,000', imageUrl: 'assets/images/Agbada.png' },
    
  ];
  styles = [
    {name: 'Corporates', imageUrl: 'assets/images/corporate.png'},
    {name: 'Natives', imageUrl: 'assets/images/Agbada (2).png'},
    {name: 'Casuals', imageUrl: 'assets/images/Casual.png'}
  ]; 

  categories = [
    {name: 'Men', imageUrl: 'assets/images/Men.png'},
    {name: 'Women', imageUrl: 'assets/images/Women.png'},
    {name: 'Couples', imageUrl: 'assets/images/Couples.png'},
    {name: 'Kids', imageUrl: 'assets/images/Kids.png'},
    {name: 'Family', imageUrl: 'assets/images/Family.png'},
    {name: 'Aso-Ebi', imageUrl: 'assets/images/Aso-Ebi.png'}
  ]
  tailors = [
    {name: 'Ed Johnson', description: 'Brief Introduction', imageUrl: 'assets/images/Ed.png'},
    {name: 'John Yakubu', description: 'Brief Introduction', imageUrl: 'assets/images/John.png'},
    {name: 'Micheal Olabisi', description: 'Brief Introduction', imageUrl: 'assets/images/Michael.png'},
    {name: 'Frederick Williams', description: 'Brief Introduction', imageUrl: 'assets/images/Williams.png'},
    {name: 'Abosode Temitope', description: 'Brief Introduction', imageUrl: 'assets/images/Temitope.png'},
    {name: 'Ezekiel Chidera', description: 'Brief Introduction', imageUrl: 'assets/images/Chidera.png'},
    
  ]
  blogs = [
    {name: 'How to style your dress to fit your taste!', description: 'How to style your dress to fit your taste!How to style your dress to fit your taste!How to style your dress to fit your taste!', imageUrl: 'assets/images/Blog.png'},
    {name: 'How to style your dress to fit your taste!', description: 'How to style your dress to fit your taste!How to style your dress to fit your taste!How to style your dress to fit your taste!', imageUrl: 'assets/images/Blog1.png'},
  ]

}
