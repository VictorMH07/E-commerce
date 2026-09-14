import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {  ProductCard } from '../../shared/components/product-card/product-card';
import { FavoriteService } from '../../shared/services/favorite.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-favorites',
  imports: [ProductCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

  private readonly favoriteService = inject(FavoriteService);
  private readonly productService = inject(ProductService);

  readonly favoriteProducts = computed(() => {
    return this.favoriteService.favorites().map(id => this.productService.getById(id)).filter(product => product !== undefined);
  });

}
