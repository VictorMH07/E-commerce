import { Injectable, signal } from '@angular/core';

import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private readonly _orders = signal<Order[]>([]);
  readonly orders = this._orders.asReadonly();

  constructor() {
    this.loadOrders();
  }

  addOrder(order: Order): void {
    this._orders.update(orders => [...orders, order]);
    this.saveOrders();
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this._orders()));
  }

  private loadOrders(): void {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      this._orders.set(JSON.parse(storedOrders));
    }
  }
}
