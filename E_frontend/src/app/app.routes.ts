import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { ProductDetail } from './features/product-detail/product-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Orders } from './shared/components/orders/orders';
import { OrderDetail } from './features/order-detail/order-detail';
import { authGuard } from './shared/guards/auth-guard';
import { Profile } from './features/profile/profile';
import { Favorites } from './features/favorites/favorites';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'catalog',
        component: Catalog
    },
    {
        path: 'product/:id',
        component: ProductDetail
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'favorites',
        component: Favorites,
        canActivate: [authGuard]
    },
    {
        path: 'checkout',
        component: Checkout,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'orders',
        component: Orders,
        canActivate: [authGuard]
    },
    {
        path: 'orders/:orderNumber',
        component: OrderDetail,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
    
];