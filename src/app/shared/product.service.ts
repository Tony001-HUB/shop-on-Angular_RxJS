import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry} from 'rxjs/operators';
import { FbResponse, Product } from './interfaces';

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
  getAllProduct(): any {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map(response => {
          return Object
            .keys(response)
            .map( key => ({
            ...response[key],
              id: key,
              date: new Date(response[key].date)
          }));
      }));
  }

  getProductById(id): any {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map( (response: Product) => {
        return {
          ...response,
          id,
          date: new Date(response.date)
        };
      }));
  }

  removeProductById(id): any {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  updateProduct(product: Product): any {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }
}
