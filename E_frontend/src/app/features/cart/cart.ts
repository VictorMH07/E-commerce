import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../shared/services/cart.service';
import { CartItem } from '../../shared/components/cart-item/cart-item';
import { CartSummary } from '../../shared/components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, CartItem, CartSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService) {}

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }
}
