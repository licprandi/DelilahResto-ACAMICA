const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

/* ################## ------ ################## */




router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const mysqlConnection = require('../DB/delilahDB');


/* ############## LISTAR USUARIOS ############# */
let listarUsuarios = (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })
};

/* ######### VALIDAR USUARIO EXISTENTE ######## */
// let validarUsuarioExistente = (req, res) => {
//     mysqlConnection.query('SELECT usuario FROM usuarios', (err, result) => {
//         if (!err) {
//             res.status(200).send(result);
//         } else {
//             console.log(err);
//         }
//     })
// };

/* ############# LISTAR PRODUCTOS ############# */
let listarProductos = (req, res) => {
    mysqlConnection.query('SELECT * FROM productos', (err, result) => {
        if (!err) {
            res.status(200).send(result);
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
        res.status(200).send(result);
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
        res.status(200).send('Pedido generado con Éxito!');
    });
};


/* ############## LISTAR PEDIDOS ############## */
let listarPedidos = (req, res) => {
    mysqlConnection.query('SELECT * FROM pedidos', (err, result) => {
        if (!err) {
            res.status(200).send(result);
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
        res.status(200).send(result);
    })
};


/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */
let actualizarEstadoPedido = (req, res) => {
    let id = req.params.id;
    let estado = req.body.estado;
    let queryEstadoPedidos = `UPDATE pedidos SET estado = ${estado} WHERE usuario = ${id}`;

    mysqlConnection.query(queryEstadoPedidos, (err, result) => {
        if (err) throw err;
        res.status(200).send("Estado actualizado con Éxito!");
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
        res.status(200).send('Producto Guardado con Éxito');
    })
};


/* ############## EDITAR PRODUCTO ############# */
let editarProducto = (req, res) => {
    let id = req.params.id;
    let { nombre, precio, descripcion, item } = req.body;
    let queryActualizarProducto = `UPDATE productos SET nombre = '${nombre}', precio = ${precio}, descripcion = '${descripcion}', item = '${item}' WHERE id_producto = ${id}`;

    mysqlConnection.query(queryActualizarProducto, (err, result) => {
        if (err) throw err;
        res.status(200).send("Producto actualizado con Éxito!");
    })
};


/* ############# ELIMINAR PRODUCTO ############ */
let eliminarProducto = (req, res) => {
    let id = req.params.id;
    let queryEliminarProducto = `DELETE FROM productos WHERE id_producto = ${id}`;

    mysqlConnection.query(queryEliminarProducto, (err, result) => {
        if (err) throw err;
        res.status(200).send("Producto eliminado con Éxito!");
    })
};


function verificarDB(tabla, parametro) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`SELECT ${parametro} FROM ${tabla}`, (err, result) => {
            if (!err) reject(err)
            resolve(result);
        })
    })
};


/* ############################################ */
/*               EXPORTAR MODULOS               */
/* ############################################ */

module.exports = {
    listarUsuarios: listarUsuarios,
    listarProductos: listarProductos,
    listarProductosId: listarProductosId,
    generarPedido: generarPedido,
    listarPedidos: listarPedidos,
    listarPedidosUsuario: listarPedidosUsuario,
    actualizarEstadoPedido: actualizarEstadoPedido,
    agregarProducto: agregarProducto,
    editarProducto: editarProducto,
    eliminarProducto: eliminarProducto,
}