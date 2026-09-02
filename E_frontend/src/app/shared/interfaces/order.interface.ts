import { CartItem } from './cart-item.interface';

export interface Order {
    orderNumber: string;
    date: Date;
    status: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        payment: string;
    };
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}