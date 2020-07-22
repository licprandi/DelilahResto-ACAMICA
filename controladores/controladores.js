const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const mysqlConnection = require('../DB/delilahDB');


/* ############### CREAR USUARIO ############## */
let crearUsuario = (req, res) => {
    let { usuario, password, nombre_apellido, email, telefono, direccion_envio, administrador } = req.body;
    let queryInsertUsuario = `INSERT INTO usuarios (usuario, password, nombre_apellido, email, telefono, direccion_envio, administrador) 
        VALUES ('${usuario}', '${password}', '${nombre_apellido}', '${email}', '${telefono}', '${direccion_envio}', '${administrador}')`;

    mysqlConnection.query(queryInsertUsuario, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Usuario Guardado con Éxito');
    });
};


/* ############## LISTAR USUARIOS ############# */
let listarUsuarios = (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            console.log(err);
        }
    })
};


/* ############# LISTAR PRODUCTOS ############# */
let listarProductos = (req, res) => {
    mysqlConnection.query('SELECT * FROM productos', (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            console.log(err);
        }
    })
};


/* ########## LISTAR PRODUCTOS POR ID ######### */
let listarProductosId = (req, res) => {
    let id = req.params.id;
    let queryProductos = `SELECT t.id_producto, t.nombre, t.precio, t.descripcion, t.item FROM productos t WHERE id_producto = ${id}`;

    mysqlConnection.query(queryProductos, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}


/* ############## GENERAR PEDIDO ############## */
let generarPedido = (req, res) => {
    let { usuario, descripcion, metodo_pago, cantidad, total } = req.body;
    let queryInsertPedido = `INSERT INTO pedidos (usuario, descripcion, metodo_pago, cantidad, total) 
        VALUES ('${usuario}', '${descripcion}', '${metodo_pago}', '${cantidad}', '${total}')`;

    mysqlConnection.query(queryInsertPedido, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Pedido generado con Éxito!');
    });
};


/* ############## LISTAR PEDIDOS ############## */
let listarPedidos = (req, res) => {
    mysqlConnection.query('SELECT * FROM pedidos', (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            console.log(err);
        }
    })
};


/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */
let listarPedidosUsuario = (req, res) => {
    let id = req.params.id;
    let queryPedidos = `SELECT id_pedido, usuario, DATE_FORMAT(fecha, "%d %M %Y %T"), descripcion, estado, metodo_pago, cantidad, total FROM pedidos WHERE usuario = ${id}`;

    mysqlConnection.query(queryPedidos, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
};


/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */
let actualizarEstadoPedido = (req, res) => {
    let id = req.params.id;
    let estado = req.body.estado;
    let queryEstadoPedidos = `UPDATE pedidos SET estado = ${estado} WHERE usuario = ${id}`;

    mysqlConnection.query(queryEstadoPedidos, (err, result) => {
        if (err) throw err;
        res.send("Estado actualizado con Éxito!");
    })
};


/* ############# AGREGAR PRODUCTO ############# */
let agregarProducto = (req, res) => {
    let { nombre, precio, descripcion, item } = req.body;
    let queryInsertProducto = `INSERT INTO productos (nombre, precio, descripcion, item) 
        VALUES ('${nombre}', '${precio}', '${descripcion}', '${item}')`;

    mysqlConnection.query(queryInsertProducto, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Producto Guardado con Éxito');
    })
};


/* ############## EDITAR PRODUCTO ############# */
let editarProducto = (req, res) => {
    let id = req.params.id;
    let { nombre, precio, descripcion, item } = req.body;
    let queryActualizarProducto = `UPDATE productos SET nombre = '${nombre}', precio = ${precio}, descripcion = '${descripcion}', item = '${item}' WHERE id_producto = ${id}`;

    mysqlConnection.query(queryActualizarProducto, (err, result) => {
        if (err) throw err;
        res.send("Producto actualizado con Éxito!");
    })
};


/* ############# ELIMINAR PRODUCTO ############ */
let eliminarProducto = (req, res) => {
    let id = req.params.id;
    let queryEliminarProducto = `DELETE FROM productos WHERE id_producto = ${id}`;

    mysqlConnection.query(queryEliminarProducto, (err, result) => {
        if (err) throw err;
        res.send("Producto eliminado con Éxito!");
    })
};


/* ############################################ */
/*               ESPORTAR MODULOS               */
/* ############################################ */

module.exports = {
    listarUsuarios: listarUsuarios,
    crearUsuario: crearUsuario,
    listarProductos: listarProductos,
    listarProductosId: listarProductosId,
    generarPedido: generarPedido,
    listarPedidos: listarPedidos,
    listarPedidosUsuario: listarPedidosUsuario,
    actualizarEstadoPedido: actualizarEstadoPedido,
    agregarProducto: agregarProducto,
    editarProducto: editarProducto,
    eliminarProducto: eliminarProducto
}