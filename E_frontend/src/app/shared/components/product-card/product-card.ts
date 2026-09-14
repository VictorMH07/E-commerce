import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();

  private cart = inject(CartService);
  public favoriteService = inject(FavoriteService);

  addToCart(): void {
    this.cart.addToCart(this.product());
  }

  toggleFavorite(): void {
    this.favoriteService.toggleFavorite(this.product().id);
  }

  isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.product().id);
  }
}