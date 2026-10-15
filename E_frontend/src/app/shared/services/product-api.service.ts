import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from "rxjs";

import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';

interface ProductApi {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: number;
  old_price: number | null;
  rating: number;
  category: string;
  stock: number;
  is_active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products/`;

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductApi[]>(this.apiUrl).pipe(
      map(products =>
        products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          oldPrice: product.old_price ?? undefined,
          rating: product.rating,
          category: product.category,
          stock: product.stock,
        })),
      ),
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<ProductApi>(`${this.apiUrl}${id}/`).pipe(
      map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        oldPrice: product.old_price ?? undefined,
        rating: product.rating,
        category: product.category,
        stock: product.stock,
      })),
    );
  }
}