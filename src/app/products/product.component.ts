import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Product } from './product';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.product$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.productService.getProduct(params.get('id')));
  }

}
