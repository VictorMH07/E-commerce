import { Injectable, effect, inject, signal } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private readonly authService = inject(AuthService);
  private readonly _favorites = signal<number[]>([]);
  readonly favorites = this._favorites.asReadonly();

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      this.loadFavorites(user?.id);
    });
  }

  isFavorite(productId: number): boolean {
    return this._favorites().includes(productId);
  }

  toggleFavorite(productId: number): void {
    if (this.isFavorite(productId)) {
      this._favorites.update(favorites => favorites.filter(id => id !== productId));
    }
    else {
      this._favorites.update(favorites => [...favorites, productId]);
    }

    this.saveFavorites();
  }

  private getStorageKey(userId?: string): string {
    return userId? `favorites_${userId}`: 'favorites_guest';
  }

  private saveFavorites(): void {
    const userId = this.authService.currentUser()?.id;
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(this._favorites()));
  }

  private loadFavorites(userId?: string): void {
    const storedFavorites = localStorage.getItem(this.getStorageKey(userId));

    if (storedFavorites) {
      this._favorites.set(JSON.parse(storedFavorites));
    }
    else {
      this._favorites.set([]);
    }
  }
}