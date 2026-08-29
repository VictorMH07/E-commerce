import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  readonly shipping = 15000;

  orderConfirmed = false;
  orderData: any = null;
  orderNumber = '';

  orderDate = new Date();
  orderStatus = 'Pedido recibido';

  private fb = inject(FormBuilder)

  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    payment: ['', Validators.required],
  });

  constructor(public cartService: CartService) {}

  get total(): number {
    return this.cartService.totalPrice() + this.shipping;
  }

  submitOrder(): void{
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      console.log('Formulario inválido');
      return;
    }

    this.orderNumber = `EC-${Date.now()}`;
    this.orderDate = new Date();

    this.orderData = {
      customer: this.checkoutForm.value,
      items: this.cartService.items(),
      subtotal: this.cartService.totalPrice(),
      shipping: this.shipping,
      total: this.total
    };

    console.log('Pedido válido');
    console.log(this.orderData);

    this.cartService.clearCart();

    this.orderConfirmed = true;
  }

  getPaymentMethodName(payment: string): string {
    switch(payment) {
      case 'card':
        return 'Tarjeta de crédito o débito';

      case 'pse':
        return 'PSE';

      case 'cash':
        return 'Pago contraentrega';

      default:
        return payment;
    }
  }

  getCityName(city: string): string {
    switch (city) {
      case 'ipiales':
        return 'Ipiales';

      case 'pasto':
        return 'Pasto';

      case 'bogota':
        return 'Bogotá';

      case 'cali':
        return 'Cali';

      case 'medellin':
        return 'Medellín';

      default:
        return city;
    }
  }
}