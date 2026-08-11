import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})

export class ProductDetail {
  product?: Product;
  quantity = 1;
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1){
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product){
      for (let i = 0; i < this.quantity; i++){
        this.cartService.addToCart(this.product);
      }
    }
  }
}