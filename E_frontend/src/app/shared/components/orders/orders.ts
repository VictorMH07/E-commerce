import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  constructor(public orderService: OrderService) {}

}
