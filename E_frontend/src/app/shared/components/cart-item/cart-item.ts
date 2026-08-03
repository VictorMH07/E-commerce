import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartItem as Item} from '../../interfaces/cart-item.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  item = input.required<Item>();
  constructor(private cartService: CartService){}

  increase(): void{
    this.cartService.increaseQuantity(this.item().product.id);
  }

  decrease(): void{
    this.cartService.decreaseQuantity(this.item().product.id);
  }

  remove(): void{
    this.cartService.removeItem(this.item().product.id);
  }
}
