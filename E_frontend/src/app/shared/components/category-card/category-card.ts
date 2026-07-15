import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {

    name = input.required<string>();
    image = input.required<string>();
    route = input.required<string>();
}
