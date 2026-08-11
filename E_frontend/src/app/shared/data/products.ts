import { Product } from "../interfaces/product.interface";

export const PRODUCTS: Product[] = [

  {
    id: 1,
    name: 'Laptop ASUS TUF Gaming',
    description: 'Laptop de alto rendimiento para juegos y tareas exigentes, con procesador potente y tarjeta gráfica dedicada.',
    image: 'images/products/laptop.jpg',
    price: 4699900,
    oldPrice: 5200000,
    rating: 4.8,
    category: 'Tecnología',
    stock: 8
  },

  {
    id: 2,
    name: 'iPhone 16 Pro',
    description: 'El iPhone 16 Pro ofrece un rendimiento excepcional, cámara avanzada y diseño elegante, brindando una experiencia premium.',
    image: 'images/products/iphone.jpg',
    price: 5899900,
    rating: 4.9,
    category: 'Tecnología',
    stock: 5
  },
 
  {
    id: 3,
    name: 'Audífonos Sony WH-1000XM5',
    description: 'Audífonos inalámbricos con cancelación de ruido líder en la industria, ofreciendo una experiencia de sonido envolvente y cómoda.',
    image: 'images/products/headphone.jpg',
    price: 1599900,
    oldPrice: 1899900,
    rating: 4.7,
    category: 'Tecnología',
    stock: 12
  },

  {
    id: 4,
    name: 'Smartwatch Samsung',
    description: 'Smartwatch con funciones avanzadas de seguimiento de salud, notificaciones inteligentes y diseño elegante para un estilo de vida activo.',
    image: 'images/products/watch.jpg',
    price: 999900,
    rating: 4.6,
    category: 'Tecnología',
    stock: 15
  },

  {
    id: 5,
    name: 'Sofá Moderno',
    description: 'Sofá de tres puestos',
    image: 'images/products/sofá.jpg',
    price: 1800000,
    rating: 4.5,
    category: 'Hogar',
    stock: 10
  }
];