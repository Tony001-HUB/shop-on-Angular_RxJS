import { Injectable } from '@angular/core';
import {FbResponse, Product} from './interfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order): any {
    return this.http
      .post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map( (response: FbResponse) => {
        return{
          ...order,
          id: response.name,
          date: new Date(order.date)
        };
      }));
  }

  getAllProduct(): any {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
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

  removeProductById(id): any {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }

}
