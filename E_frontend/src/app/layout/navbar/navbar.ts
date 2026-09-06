import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';

import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public cartService: CartService, public authService: AuthService) {}

  logout(): void {
    this.authService.logout()
  }
}
