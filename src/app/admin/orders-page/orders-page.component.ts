import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders = [];

  ngOnInit(): void {
    this.orderService.getAllProduct().subscribe( products => {
      this.orders = products;
    });
  }

  remove(id): void {
    this.orderService.removeProductById(id).subscribe( () => {
      this.orders = this.orders.filter(product => product.id !== id);
    });
  }

}
