import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})

export class CartSummary {
  readonly shipping = 15000;

  constructor(public cartService: CartService){}

  get total(): number{
    return this.cartService.totalPrice() + this.shipping;
  }
}
