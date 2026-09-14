import { Injectable, effect, inject, signal } from '@angular/core';

import { Order } from '../interfaces/order.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private readonly authService = inject(AuthService);
  private readonly _orders = signal<Order[]>([]);
  readonly orders = this._orders.asReadonly();

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      this.loadOrders(user?.id);
    })
  }

  addOrder(order: Order): void {
    this._orders.update(orders => [...orders, order]);
    this.saveOrders();
  }

  private getStorageKey(userId?: string): string {
    return userId? `orders_${userId}`: 'orders_guest';
  }

  private saveOrders(): void {
    const userId = this.authService.currentUser()?.id;
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(this._orders()));
  }

  private loadOrders(userId?: string): void {
    const storedOrders = localStorage.getItem(this.getStorageKey(userId));
    if (storedOrders) {
      this._orders.set(JSON.parse(storedOrders));
    }
    else {
      this._orders.set([]);
    }
  }
}