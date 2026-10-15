import { inject, Injectable, signal, computed } from '@angular/core';

import { ProductApiService } from './product-api.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productApi = inject(ProductApiService);

  private readonly _products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly searchTerm = signal('');
  readonly selectedCategory = signal('Todas');
  readonly sortOptin = signal('default');

  constructor() {
    this.productApi.getProducts().subscribe({
      next: (products) => {
        this._products.set(products);
        this.loading.set(false);
        this.error.set(null);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(
          'No se pudieron cargar los productos. Verifica que el servidor esté funcionando.',
        );
      },
    });
  }

  readonly products = computed(() => {
    let products = this._products();

    // Buscar
    const term = this.searchTerm().trim().toLowerCase();

    if (term) {
      products = products.filter(
        product =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term),
      );
    }

    // Filtrar por categoría
    const category = this.selectedCategory();

    if (category !== 'Todas') {
      products = products.filter(
        product => product.category === category,
      );
    }

    // Ordenar
    switch (this.sortOptin()) {
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
        products = [...products].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
    }

    return products;
  });

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setSortOption(option: string): void {
    this.sortOptin.set(option);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('Todas');
    this.sortOptin.set('default');
  }

  readonly categories = computed(() => {
    const categories = this._products().map(
      product => product.category,
    );

    return ['Todas', ...new Set(categories)];
  });

  getById(id: number): Product | undefined {
    return this._products().find(product => product.id === id);
  }
}