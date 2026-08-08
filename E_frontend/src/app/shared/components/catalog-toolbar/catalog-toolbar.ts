import { Component } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog-toolbar',
  imports: [],
  templateUrl: './catalog-toolbar.html',
  styleUrl: './catalog-toolbar.css',
})

export class CatalogToolbar {
  constructor(public productService: ProductService) {}
  
  onSearch(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.productService.setSearchTerm(input.value);
  }

  onCategoryChange(event: Event): void{
    const select = event.target as HTMLSelectElement;
    this.productService.setCategory(select.value);
  }

  onSortChange(event: Event): void{
    const select = event.target as HTMLSelectElement;
    this.productService.setSortOption(select.value);
  }
}
