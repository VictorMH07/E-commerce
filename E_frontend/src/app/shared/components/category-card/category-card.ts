import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {

  private readonly router = inject(Router);

  name = input.required<string>();
  image = input.required<string>();
  route = input.required<string>();

  selectCategory(): void {
    this.router.navigate([this.route()], {
      queryParams: {
        category: this.name()
      }
    });
  }
}