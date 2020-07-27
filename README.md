# DelilahResto-ACAMICA
Tercer Proyecto ACAMICA - Backend API de Reservas - Node.js


## Recursos utilizados
- Node.js
- Nodemon
- Express
- Jasonwebtoken para autenticación via Token
- Bcrypt para hashear passwords
- MySQL Base de Datos
- Postman

## Objetivo
Realizar Backend de una app de pedidos de comidas.


# Documentación de la API

## Inicialización del Proyecto

### ---1--- Descargar Proyecto
Descargar el Proyecto desde el siguiente link: https://github.com/licprandi/DelilahResto-ACAMICA.git

### ---2--- Instalar Dependencias
Instalar dependencias utilizadas: npm install

### ---3--- Crear Base de Datos
Crear Base de datos con los datos incluidos en el archivo `/DB/delilaDB.sql`
Sección: ## CREAR BASE DE DATOS ##

### ---4--- Crear Tablas
Crear Tablas para la Base de Datos incluidos en el archivo `/DB/delilaDB.sql`
Sección: ## CREAR TABLAS ##

### ---5--- Incluir Valores
Incluir valores iniciales de ejemplo para tablas PRODUCTOS y ESTADOS incluidos en el archivo `/DB/delilaDB.sql`
Sección: ## VALORES PARA TABLAS ##

### ---6--- Usuario y Password Base de datos
Asegurarse de agregar Usuario y Password de acceso a la base de datos creada. Archivo `/DB/delilahDB.js`.

### ---7--- Servidor
Inicializar el servidor desde consola: node index.js

### ---8--- Colección Postman
Descargar Postman e importar la colección de endpoints para comenzar a utilizar la app desde el archivo `utils/Delilah.postman_collection.json` - (el modelo también está incluido en el archivo `/DB/delilaDB.sql` Sección: ## VALORES PARA POSTMAN ##)

#### REFERENCIAS
* REQUIERE TOKEN
    - Key: Authorization 
    - Value: Bearer 4f564f64sf64s...(colocar token generado al momento de crear el usuario)

* ADMIN
    - Sólo lo pueden hacer usuarios con rol de Administrador

#### USUARIOS
    # POST Crear Usuario
    # POST Crear Administrador
    # POST Login: Loguear usuario o administrador previamente creado.
    # GET Listar Usuarios (ADMIN) (REQUIERE TOKEN!!!)

#### PRODUCTOS (REQUIERE TOKEN)
    # GET Listar Productos
    # POST Agregar Producto (ADMIN)
    # PUT Editar Producto por Id (ADMIN)
    # DEL Borrar Producto por Id (ADMIN)

#### PEDIDOS (REQUIERE TOKEN)
    # POST Hacer Pedido
    # GET Listar Pedido de cada Usuario por Id de Usuario(ADMIN Y USUARIO DEL ID)
    # GET Listar todos los Pedidos (ADMIN)
    # PUT Actualizar Estado del Pedido por Id de Usuario (ADMIN) 


