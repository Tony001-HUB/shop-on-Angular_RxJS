import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = [];
  constructor(private productService: ProductService ) { }

  ngOnInit(): void {
      this.productService.getAllProduct().subscribe( products => {
        this.products = products;
    });
  }

  remove(id): void {
    this.productService.removeProductById(id).subscribe( () => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
