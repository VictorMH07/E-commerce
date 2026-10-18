-- Datos iniciales de productos para NovaShop.
-- Ejecutar solamente en una base de datos preparada para la carga inicial.

INSERT INTO products (
    id,
    name,
    description,
    price,
    image,
    category,
    stock,
    is_active,
    old_price,
    rating
)
VALUES
(
    3,
    'Laptop ASUS TUF Gaming',
    'Laptop de alto rendimiento para juegos y tareas exigentes, con procesador potente y tarjeta gráfica dedicada.',
    4699900,
    'images/products/laptop.jpg',
    'Tecnología',
    8,
    TRUE,
    5200000,
    4.8
),
(
    4,
    'iPhone 16 Pro',
    'El iPhone 16 Pro ofrece un rendimiento excepcional, cámara avanzada y diseño elegante, brindando una experiencia premium.',
    5899900,
    'images/products/iphone.jpg',
    'Tecnología',
    5,
    TRUE,
    NULL,
    4.9
),
(
    5,
    'Audífonos Sony WH-1000XM5',
    'Audífonos inalámbricos con cancelación de ruido líder en la industria, ofreciendo una experiencia de sonido envolvente y cómoda.',
    1599900,
    'images/products/headphone.jpg',
    'Tecnología',
    12,
    TRUE,
    1899900,
    4.7
),
(
    6,
    'Smartwatch Samsung',
    'Smartwatch con funciones avanzadas de seguimiento de salud, notificaciones inteligentes y diseño elegante para un estilo de vida activo.',
    999900,
    'images/products/watch.jpg',
    'Tecnología',
    15,
    TRUE,
    NULL,
    4.6
),
(
    7,
    'Sofá Moderno',
    'Sofá de tres puestos',
    1800000,
    'images/products/sofá.jpg',
    'Hogar',
    10,
    TRUE,
    NULL,
    4.5
),
(
    8,
    'Camiseta deportiva',
    'Camiseta cómoda y ligera, ideal para actividades deportivas y uso diario.',
    89900,
    'images/products/camiseta.jpg',
    'Moda',
    20,
    TRUE,
    NULL,
    4.6
),
(
    9,
    'Controlador gaming',
    'Controlador inalámbrico diseñado para disfrutar de una experiencia cómoda y precisa durante tus sesiones de juego.',
    249900,
    'images/products/control-gaming.jpg',
    'Gaming',
    10,
    TRUE,
    NULL,
    4.8
),
(
    10,
    'El principito',
    'Edición especial de una de las obras literarias más conocidas, ideal para lectores de todas las edades.',
    49900,
    'images/products/el-principito.jpg',
    'Libros',
    25,
    TRUE,
    NULL,
    4.9
),
(
    11,
    'Balón de Fútbol',
    'Balón de fútbol diseñado para entrenamiento y partidos recreativos.',
    149900,
    'images/products/balon.jpg',
    'Deportes',
    15,
    TRUE,
    NULL,
    4.7
);

-- Sincronizar la secuencia para que los siguientes ID continúen
-- después del ID más alto de la tabla.
SELECT setval(
    pg_get_serial_sequence('products', 'id'),
    COALESCE((SELECT MAX(id) FROM products), 1),
    EXISTS (SELECT 1 FROM products)
);
