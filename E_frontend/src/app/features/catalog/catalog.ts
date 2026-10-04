import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../shared/services/product.service';
import { CatalogToolbar } from '../../shared/components/catalog-toolbar/catalog-toolbar';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-catalog',
  imports: [CatalogToolbar, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})

export class Catalog {
  
  public readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.productService.setCategory(category);
      }
    });
  }
}
