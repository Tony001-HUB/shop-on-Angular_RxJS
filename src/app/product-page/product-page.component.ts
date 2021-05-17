import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchAll, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$;
  loading: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe( switchMap( params => {
        return this.productService.getProductById(params.id);
      }));
  }

}
