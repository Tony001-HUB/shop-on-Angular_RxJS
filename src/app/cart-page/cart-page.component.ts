import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;
  added = '';

  constructor(private productService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProduct;
    this.cartProducts.forEach(currentProduct => {
      this.totalPrice += +currentProduct.price;
      console.log(this.totalPrice);
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash')
    });
  }

  submit(): void {
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      orders: this.cartProducts,
      date: new Date()
    };

    this.orderService.create(order).subscribe( response => {
      this.form.reset();
      this.submitted = false;
      this.added = 'Delivery completed';
    });

  }

  deleteProduct(product): void {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
