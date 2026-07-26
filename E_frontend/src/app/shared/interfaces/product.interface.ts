export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    category: string;
    stock: number;
}