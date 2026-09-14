import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';

import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { FavoriteService } from '../../shared/services/favorite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public cartService: CartService,
    public authService: AuthService,
    public favoriteService: FavoriteService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
