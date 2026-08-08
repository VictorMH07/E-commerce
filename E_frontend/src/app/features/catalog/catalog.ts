import { Component } from '@angular/core';

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
  constructor(public productService: ProductService) {}
}
