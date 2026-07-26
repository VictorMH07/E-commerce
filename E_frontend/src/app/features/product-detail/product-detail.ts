import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../shared/interfaces/product.interface';
import { PRODUCTS } from '../../shared/data/products';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})

export class ProductDetail {
  product?: Product;
  constructor(private route: ActivatedRoute){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = PRODUCTS.find(product => product.id === id);
  }

}
