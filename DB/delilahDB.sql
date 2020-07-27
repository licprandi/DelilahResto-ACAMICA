/* ############################################ */
/*              CREAR BASE DE DATOS             */
/* ############################################ */

CREATE DATABASE IF NOT EXISTS delilahDB;

USE delilahDB;


/* ############################################ */
/*                 CREAR TABLAS                 */
/* ############################################ */

CREATE TABLE IF NOT EXISTS usuarios
(
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  usuario VARCHAR(60) NOT NULL,
  password VARCHAR(250) NOT NULL,
  nombre_apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR (60) NOT NULL,
  direccion_envio VARCHAR(100) NOT NULL,
  administrador BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS productos
(
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio FLOAT NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  item VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS estados
(
	id_estado INT PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pedidos
(
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,
  usuario INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT NOW(),
  descripcion INT NOT NULL,
  estado INT NOT NULL DEFAULT 1,
  metodo_pago VARCHAR(100) NOT NULL,
  cantidad INT NOT NULL,
  total FLOAT NOT NULL,
  FOREIGN KEY (usuario) REFERENCES usuarios (id_usuario),
  FOREIGN KEY (estado) REFERENCES estados(id_estado),
  FOREIGN KEY (descripcion) REFERENCES productos (id_producto)
);



/* ############################################ */
/*              VALORES PARA TABLAS             */
/* ############################################ */

-- VALORES PARA INSERTAR EN TABLA PRODUCTOS
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


-- VALORES PARA INSERTAR EN TABLA ESTADOS
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



/* ############################################ */
/*             VALORES PARA POSTMAN             */
/* ############################################ */

-- CREAR USUARIO
    "usuario": "usuario1",
    "password": "password1",
    "nombre_apellido": "Soy Usuario",
    "email": "usuario@gmail.com",
    "telefono": 3511515151,
    "direccion_envio": "Una dirección 123"

-- CREAR ADMINISTRADOR
    "usuario": "administrador1",
    "password": "administrador1",
    "nombre_apellido": "Soy Administrador",
    "email": "adminiistrador@gmail.com",
    "telefono": 3511515151,
    "direccion_envio": "Otra dirección 456",
    "administrador": 1

-- LOGIN USUARIO
    "usuario": "usuario1",
    "password": "password1"

-- LOGIN ADMINISTRADOR
    "usuario": "administrador1",
    "password": "administrador1"

-- AGREGAR PRODUCTO
    "nombre": "Nombre del Plato",
    "precio": 300,
    "descripcion": "Descripción del Plato",
    "item": "NomPla"

-- ACTUALIZAR PRODUCTO
    "nombre": "Otro Plato",
    "precio": 450,
    "descripcion": "Plato Vegetariano con múltiples vegetales",
    "item": "OtroPla"

-- HACER PEDIDO
    "usuario": 1,
    "descripcion": 3,
    "metodo_pago": "efectivo",
    "cantidad": 1,
    "total": 450

-- ACTUALIZAR ESTADO PEDIDO
    "estado": 3
