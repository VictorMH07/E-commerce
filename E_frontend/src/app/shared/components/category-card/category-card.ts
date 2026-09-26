import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {

  private readonly productService = inject(ProductService);

  name = input.required<string>();
  image = input.required<string>();
  route = input.required<string>();

  selectCategory(): void {
    this.productService.setCategory(this.name());
  }
}
