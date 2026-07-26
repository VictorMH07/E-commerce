import { Component } from '@angular/core';

import { HeroBanner } from '../../shared/components/hero-banner/hero-banner';
import { CategoryCard } from '../../shared/components/category-card/category-card';

import { CATEGORIES } from '../../shared/data/categories';

import { ProductCard } from '../../shared/components/product-card/product-card';
import { PRODUCTS } from '../../shared/data/products';

@Component({
  selector: 'app-home',
  imports: [HeroBanner, CategoryCard, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'

})
export class Home {
  categories = CATEGORIES;
  products = PRODUCTS;
}