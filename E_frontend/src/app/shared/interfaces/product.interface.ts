export interface Product {
    id: number;
    name: string;
    description: string;
    image: string | null;
    price: number;
    oldPrice?: number;
    rating: number;
    category: string;
    stock: number;
}