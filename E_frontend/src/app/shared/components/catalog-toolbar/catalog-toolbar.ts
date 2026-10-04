import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog-toolbar',
  imports: [FormsModule],
  templateUrl: './catalog-toolbar.html',
  styleUrl: './catalog-toolbar.css',
})

export class CatalogToolbar {
  
  public readonly productService = inject(ProductService);
  
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
