import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';

import { Product } from './product';
import { ItemContainer } from './item-container';

import { SessionService } from '../core/session.service';
import { LogService } from '../core/log.service';

@Injectable()
export class ProductService {

  private API_URL = '/api/products';

  constructor(private http: AuthHttp, private logService: LogService) { }

  getProducts(page: number, perpage: number, sortKey: string, sortOrder: string): Observable<ItemContainer<Product>> {
    return this.http.get(`${this.API_URL}?page=${page}&perpage=${perpage}&sortkey=${sortKey}&sortorder=${sortOrder}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get(`${this.API_URL}/${id}`)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.delete(`${this.API_URL}/${id}`)
      .map(() => id)
      .catch(error => this.handleError(error));
  }

  addProduct(product: Product): Observable<Product> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(product);
    return this.http.post(this.API_URL, body, { headers: headers })
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  editProduct(product: Product): Observable<Product> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(product);
    return this.http.put(`${this.API_URL}/${product._id}`, body, { headers: headers })
      .map(() => product)
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    this.logService.logError(error);
    return Observable.throw(error);
  }

}
