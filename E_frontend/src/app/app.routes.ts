import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { ProductDetail } from './features/product-detail/product-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

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
        path: 'checkout',
        component: Checkout
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
        path: '**',
        redirectTo: ''
    }
    
];