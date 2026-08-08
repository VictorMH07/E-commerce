import { Injectable, computed, signal } from '@angular/core';

import { PRODUCTS } from '../data/products';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private readonly _products = signal<Product[]>(PRODUCTS);
  readonly searchTerm = signal('');
  readonly selectedCategory = signal('Todas');
  readonly sortOptin = signal('default');
  readonly products = computed(() => {
    let products = this._products();

    // Buscar
    const term = this.searchTerm().trim().toLowerCase();

    if (term){
      products = products.filter(product =>
        product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term) 
      );
    }

    // Filtrar por categoria
    const category = this.selectedCategory();

    if (category !== 'Todas'){
      products = products.filter(product => product.category === category);
    }

    // Ordenar
    switch (this.sortOptin()){
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price);
      break;

      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price);
      break;

      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
      break;

      case 'name':
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
    return products;
  });

  setSearchTerm(term: string): void{
    this.searchTerm.set(term);
  }

  setCategory(category: string): void{
    this.selectedCategory.set(category);
  }

  setSortOption(option: string): void{
    this.sortOptin.set(option);
  }

  readonly categories = computed(() => {
    const categories = this._products().map(product => product.category);
    return ['Todas', ...new Set(categories)];
  });

  getById(id: number): Product | undefined {
    return this._products().find(product => product.id === id);
  }
}
