CREATE DATABASE IF NOT EXISTS delilahDB;

USE delilahDB;

-- TABLAS
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,delilahdb
  usuario VARCHAR (60) NOT NULL,
  password VARCHAR (60) NOT NULL,
  nombre_apellido VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefono INT NOT NULL,
  direccion_envio VARCHAR (60) NOT NULL,
  administrador BOOLEAN NOT NULL DEFAULT FALSE,
  desactivado BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR (60) NOT NULL,
  precio FLOAT NOT NULL,
  imagen VARCHAR(200) NOT NULL,
  desactivado BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,
  estado VARCHAR(60) NOT NULL,
  fecha DATETIME NOT NULL,
  descripcion VARCHAR(150) NOT NULL,
  metodo_pago VARCHAR (60) NOT NULL,
  total FLOAT NOT NULL,
  id_usuario INT NOT NULL DEFAULT "0",
  desactivado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS pedidos_productos (
  id_pedido_producto INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT,
  id_producto INT,
  cantidad INT NOT NULL,
  FOREIGN KEY(id_pedido) REFERENCES pedidos(id_pedido),
  FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);

-- VALORES PARA TABLA USUARIOS
INSERT INTO usuarios VALUES
  (
    NULL,
    "usuario1",
    "password1",
    "Usuario Uno",
    "usuario1@gmail.com",
    111,
    "Calle 1 111",
    TRUE,
    FALSE
  ),

  (
    NULL,
    "usuario2",
    "password2",
    "Usuario Dos",
    "usuario2@gmail.com",
    222,
    "Calle 2 222",
    FALSE,
    FALSE
  ),

  (
    NULL,
    "usuario3",
    "password3",
    "Usuarios tres",
    "usuario3@gmail.com",
    333,
    "Calle 3 333",
    FALSE,
    FALSE
  );

-- VALORES PARA TABLA PRODUCTOS
INSERT INTO productos VALUES
  (
    NULL,
    "Bagel de Salmón",
    360,
    "https://via.placeholder.com/732",
    FALSE
  ),

  (
    NULL,
    "Hamburguesa Clásica",
    300,
    "https://via.placeholder.com/237",
    FALSE
  ),

  (
    NULL,
    "Sandwich Veggie",
    265,
    "https://via.placeholder.com/200",
    FALSE
  ),

  (
    NULL,
    "Ensalada Veggie",
    60,
    "https://via.placeholder.com/666",
    FALSE
  ),

  (
    NULL,
    "Focaccia",
    400,
    "https://via.placeholder.com/444",
    FALSE
  ),

  (
    NULL,
    "Sandwich Focaccia",
    450,
    "https://via.placeholder.com/999",
    FALSE
  ),

  (
    NULL,
    "Veggie Avocado",
    450,
    "https://via.placeholder.com/888",
    FALSE
  );

-- VALORES PARA TABLA PEDIDOS
INSERT INTO pedidos VALUES
  (
    NULL,
    "nuevo",
    NOW(),
    "1x HambClas, 1x SandVegg",
    "efectivo",
    480,
    1,
    FALSE
  ),

  (
    NULL,
    "confirmado",
    NOW(),
    "2x Focaccia",
    "tarjeta",
    120,
    3,
    FALSE
  ),

  (
    NULL,
    "preparando",
    NOW(),
    "2x SanVeggie",
    "tarjeta",
    120,
    1,
    FALSE
  ),

  (
    NULL,
    "enviando",
    NOW(),
    "1x HamClas",
    "efectivo",
    400,
    3,
    FALSE
  ),

  (
    NULL,
    "cancelado",
    NOW(),
    "1x SanVeggie",
    "efectivo",
    450,
    2,
    FALSE
  ),

  (
    NULL,
    "entregado",
    NOW(),
    "2x BagSal, 2x HamClas",
    "tarjeta",
    450,
    1,
    FALSE
  );

-- VALORES PARA TABLA DE PEDIDOS DE PRODUCTOS
INSERT INTO pedidos_productos VALUES
  (NULL, 1, 1, 1),
  (NULL, 1, 4, 2),
  (NULL, 2, 4, 2),
  (NULL, 3, 4, 2),
  (NULL, 4, 5, 1),
  (NULL, 5, 6, 1),
  (NULL, 6, 7, 1);
  
  //SELECT * FROM pedidos
