import { Component, computed } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  constructor(public orderService: OrderService, public authService: AuthService) {}

  readonly myOrders = computed(() => {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return [];
    }

    return this.orderService.orders().filter(
      order => order.customer.email === currentUser.email
    );
  });
}
