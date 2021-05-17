import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products$;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProduct();
  }

}
