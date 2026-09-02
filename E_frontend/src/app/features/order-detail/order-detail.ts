import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {

  order: any = null;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber');
    this.order = this.orderService.orders().find(order => order.orderNumber === orderNumber);
  }
}
