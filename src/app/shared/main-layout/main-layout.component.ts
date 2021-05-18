import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type = 'Phone';
  isAuthAsAdmin = true;
  constructor(private router: Router, private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthAsAdmin = this.authService.isAuthenticated();
  }

  setType(type): void {
    this.type = type;

    if (this.type !== 'Cart' ){
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });

      this.productService.setType(this.type);
    }
  }
}
