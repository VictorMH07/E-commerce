import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { CartItem } from '../interfaces/cart-item.interface';
import { Product } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private readonly authService = inject(AuthService);
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() => this._items().reduce((total, item) => total + item.quantity, 0));
  readonly totalPrice = computed(() => this._items().reduce((total, item) => total + (item.product.price * item.quantity), 0));

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      this.loadCart(user?.id);
    });
  }
  
  addToCart(product: Product): void {
    const currentItems = this._items();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem){
      this._items.update(items => items.map(item => item.product.id === product.id ? {...item, quantity: Math.min(item.quantity + 1, item.product.stock)}: item));
    } 
    else {
      this._items.update(items => [...items, {product, quantity: 1}]);
    }
    this.saveCart();
  }

  increaseQuantity(productId: number): void {
    this._items.update(items => items.map(item => item.product.id === productId ? {...item, quantity: Math.min(item.quantity + 1, item.product.stock)}: item));

    this.saveCart();
  }

  decreaseQuantity(productId: number): void {
    this._items.update(items => items.map(item => item.product.id === productId ? {...item, quantity: item.quantity - 1}: item).filter(item => item.quantity > 0));

    this.saveCart();
  }

  removeItem(productId: number): void {
    this._items.update(items => items.filter(item => item.product.id !== productId));

    this.saveCart();
  }

  clearCart(): void{
    this._items.set([]);
    this.saveCart();
  }

  private getStorageKey(userId?: string): string {
    return userId? `cart_${userId}`: 'cart_guest';
  }

  private saveCart(): void {
    const userId = this.authService.currentUser()?.id;

    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(this._items()));
  }

  private loadCart(userId?: string): void {
    const storedCart = localStorage.getItem(this.getStorageKey(userId));
    if (storedCart) {
      this._items.set(JSON.parse(storedCart));
    }
    else {
      this._items.set([]);
    }
  }
}
