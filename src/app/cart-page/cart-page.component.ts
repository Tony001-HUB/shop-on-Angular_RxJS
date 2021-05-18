import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = [];
  totalPrice = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProduct;
    this.cartProducts.forEach(currentProduct => {
      this.totalPrice += +currentProduct.price;
      console.log(this.totalPrice);
    });
  }

}
