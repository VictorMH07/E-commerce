import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { FavoriteService } from '../../shared/services/favorite.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchTerm = '';

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    public favoriteService: FavoriteService,
    public productService: ProductService,
    private router: Router
  ) {}

  search(): void {
    const term = this.searchTerm.trim();

    this.productService.setSearchTerm(term);
    this.router.navigate(['/catalog']);
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
