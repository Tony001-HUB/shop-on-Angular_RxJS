import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { FbResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product): any {
    this.http
      .post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map( (response: FbResponse) => {
        return{
          ...product,
          id: response.name,
          date: new Date(product.date)
        };
      })).subscribe();

  }
}
