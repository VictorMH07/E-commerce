import { Injectable, signal, computed } from '@angular/core';

import { CartItem } from '../interfaces/cart-item.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() => this._items().reduce((total, item) => total + item.quantity, 0));
  readonly totalPrice = computed(() => this._items().reduce((total, item) => total + (item.product.price * item.quantity), 0));
  
  addToCart(product: Product): void{
    const currentItems = this._items();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem){
      this._items.update(items => items.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1}: item));
    } 
    else {
      this._items.update(items => [...items, {product, quantity: 1}]);
    }
    console.log(this._items());
  }

  increaseQuantity(productId: number): void {
    this._items.update(items => items.map(item => item.product.id === productId ? {...item, quantity: Math.min(item.quantity + 1, item.product.stock)}: item));
  }

  decreaseQuantity(productId: number): void {
    this._items.update(items => items.map(item => item.product.id === productId ? {...item, quantity: item.quantity - 1}: item).filter(item => item.quantity > 0));
  }

  removeItem(productId: number): void{
    this._items.update(items => items.filter(item => item.product.id !== productId));
  }

  clearCart(): void{
    this._items.set([]);
  }
}
