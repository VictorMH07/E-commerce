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

  getCityName(city: string): string {
    switch (city) {
      case 'ipiales': return 'Ipiales';
      case 'pasto': return 'Pasto';
      case 'bogota': return 'Bogota';
      case 'cali': return 'Cali';
      case 'medellin': return 'Medellin';
      default: return city
    }
  }

  getPaymentMethodName(payment: string): string {
    switch (payment) {
      case 'card': return 'Tarjeta de crédito o débito';
      case 'pse': return 'PSE';
      case 'cash': return 'Pago contraentrega';
      default: return payment
    }
  }
}
