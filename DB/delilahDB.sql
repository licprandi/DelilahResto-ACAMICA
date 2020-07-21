CREATE DATABASE IF NOT EXISTS delilahDB;

USE delilahDB;

-- TABLAS

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  usuario VARCHAR (60) NOT NULL,
  password VARCHAR (60) NOT NULL,
  nombre_apellido VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefono INT NOT NULL,
  direccion_envio VARCHAR (60) NOT NULL,
  administrador BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR (60) NOT NULL,
  precio FLOAT NOT NULL,
  descripcion VARCHAR (200) NOT NULL,
  item VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS estados (
	id_estado INT PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,
  usuario INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT NOW(),
  descripcion INT NOT NULL,
  estado INT NOT NULL DEFAULT 1,
  metodo_pago VARCHAR (60) NOT NULL,
  cantidad INT NOT NULL,
  total FLOAT NOT NULL,
  FOREIGN KEY(usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY(estado) REFERENCES estados(id_estado),
  FOREIGN KEY(descripcion) REFERENCES productos(id_producto)
);

INSERT INTO usuarios VALUES
  (
    NULL,
    "usuario1",
    "password1",
    "Usuario Uno",
    "usuario1@gmail.com",
    11111,
    "Calle 1 111",
    TRUE
  ),

  (
    NULL,
    "usuario2",
    "password2",
    "Usuario Dos",
    "usuario2@gmail.com",
    22222,
    "Calle 2 222",
    FALSE
  ),

  (
    NULL,
    "usuario3",
    "password3",
    "Usuarios tres",
    "usuario3@gmail.com",
    33333,
    "Calle 3 333",
    FALSE
  );

-- VALORES PARA TABLA PRODUCTOS
INSERT INTO productos VALUES
  (
    NULL,
    "Bagel de Salmón",
    360,
    "Bagel de Salmon cocinado a la plancha",
    "BagSal"
  ),

  (
    NULL,
    "Hamburguesa Clásica",
    300,
    "Hamburguesa de Carne con huevo y papas fritas",
    "HamClas"
  ),

  (
    NULL,
    "Sandwich Veggie",
    265,
    "Sandwich de tomate y lechuga con Pan Francés tostas",
    "SanVeg"
  ),

  (
    NULL,
    "Ensalada Veggie",
    60,
    "Ensalada de tomate y Lechuga con aceite de oliva",
    "EnsVeg"
  ),

  (
    NULL,
    "Focaccia",
    400,
    "Pan plano cubierto con hierbas y queso muzzarella",
    "Foc"
  ),

  (
    NULL,
    "Sandwich Focaccia",
    450,
    "Sandwich de nuestra tracional Focaccia",
    "SanFoc"
  ),

  (
    NULL,
    "Veggie Avocado",
    450,
    "Plato Vegetariano con multiples vegetales",
    "VegAvo"
  );

-- VALORES PARA TABLA ESTADOS
INSERT INTO estados VALUES
(
  NULL,
  "nuevo"
),

(
  NULL,
  "confirmado"
),

(
  NULL,
  "preparando"
),

(
  NULL,
  "enviando"
),

(
  NULL,
  "enviado"
),

(
  NULL,
  "cancelado"
);

INSERT INTO pedidos VALUES
  (
    NUll,
    2,
    NOW(),
    2,
    1,
    "efectivo",
    1,
    450
  ),

  (
    NULL,
    2,
    NOW(),
    1,
    2,
    "efectivo",
    2,
    700
  ),

  (
    NULL,
    1,
    NOW(),
    3,
    3,
    "tarjeta",
    1,
    450
  ),

  (
    NULL,
    3,
    NOW(),
    4,
    4,
    "efectivo",
    3,
    900
  );

SELECT * FROM usuarios
SELECT * FROM productos
SELECT * FROM estados
SELECT * FROM pedidos
TRUNCATE TABLE pedidos
DROP TABLE pedidos


/* ############### POST USUARIO ############### */
    "usuario": "usuario4",
    "password": "password4",
    "nombre_apellido": "Usuario Cuatro",
    "email": "usuario4@gmail.com",
    "telefono": 444,
    "direccion_envio": "Calle 4 444",
    "administrador": 1,
    "desactivado": 0


/* ############### POST PEDIDOS ############### */

