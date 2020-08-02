const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mysqlConnection = require('../DB/delilahDB');

/* ############## LISTAR USUARIOS ############# */
function listarUsuarios(req, res) {
    mysqlConnection.query('SELECT * FROM usuarios', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })
};

/* ############# LISTAR PRODUCTOS ############# */
function listarProductos(req, res) {
    mysqlConnection.query('SELECT * FROM productos', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })
};

/* ########## LISTAR PRODUCTOS POR ID ######### */
function listarProductosId(req, res) {
    let id = req.params.id;
    let queryProductos = `SELECT t.id_producto, t.nombre, t.precio, t.descripcion, t.item FROM productos t WHERE id_producto = ${id}`;

    mysqlConnection.query(queryProductos, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

/* ############## GENERAR PEDIDO ############## */
function generarPedido(req, res) {
    let { usuario, descripcion, metodo_pago } = req.body;
    let totalGeneral = 0;

    descripcion.forEach((detalle) => {
        let queryObtenerPrecio = `SELECT precio FROM productos WHERE id_producto = ${detalle.producto}`;
        mysqlConnection.query(queryObtenerPrecio, (err, result) => {
            if (err) throw err;
            let totalProducto = result[0].precio * detalle.cantidad;
            totalGeneral += totalProducto;
        })
    });

    mysqlConnection.beginTransaction(function (err) {
        if (err) throw err;

        let queryInsertPedido = `INSERT INTO pedidos (usuario, metodo_pago, total) 
            VALUES ('${usuario}', '${metodo_pago}', '${totalGeneral}')`;
        mysqlConnection.query(queryInsertPedido, (err, result) => {
            if (err) {
                mysqlConnection.rollback(function () {
                    throw err;
                });
            } else {
                let idPedido = result.insertId;
                console.log(result);

                descripcion.forEach(detalle => {

                    let queryInsertDetallePedido = `INSERT INTO detalle_pedidos (id_pedido, producto, cantidad) 
                    VALUES ('${idPedido}', '${detalle.producto}', '${detalle.cantidad}')`;

                    mysqlConnection.query(queryInsertDetallePedido, (err, result) => {
                        if (err) {
                            mysqlConnection.rollback(function () {
                                throw err;
                            });
                        }
                    })
                });
                mysqlConnection.commit(function (err) {
                    if (err) {
                        mysqlConnection.rollback(function () {
                            throw err;
                        });
                    }
                });
                res.send('Pedido generado con Éxito!');
            }
        });
    });
}

/* ############## LISTAR PEDIDOS ############## */
function listarPedidos(req, res) {
    mysqlConnection.query('SELECT detalle_pedidos.id_pedido, pedidos.usuario, pedidos.fecha, pedidos.estado, detalle_pedidos.producto, detalle_pedidos.cantidad, pedidos.total FROM detalle_pedidos INNER JOIN pedidos ON detalle_pedidos.id_pedido = pedidos.id_pedido', (err, result) => {
        if (!err) {
            let objetoResultado = [];
            result.forEach((pedidoBD) => {
                let elPedidoNoEstaAgregado = true;

                objetoResultado.forEach((pedidoYaAgregado) => {
                    if (pedidoYaAgregado.id_pedido === pedidoBD.id_pedido) {
                        elPedidoNoEstaAgregado = false;
                        pedidoYaAgregado.descripcion.push(
                            {
                                producto: pedidoBD.producto,
                                cantidad: pedidoBD.cantidad,
                            }
                        )
                    }
                })

                if (elPedidoNoEstaAgregado) {
                    const nuevoObjetoPedido = {
                        id_pedido: pedidoBD.id_pedido,
                        usuario: pedidoBD.usuario,
                        fecha: pedidoBD.fecha,
                        estado: pedidoBD.estado,
                        descripcion: [],
                        total: pedidoBD.total,
                    }
                    nuevoObjetoPedido.descripcion.push(
                        {
                            producto: pedidoBD.producto,
                            cantidad: pedidoBD.cantidad,
                        }
                    )
                    objetoResultado.push(nuevoObjetoPedido);
                }
            })
            res.status(200).send(objetoResultado);
        } else {
            console.log(err);
        }
    })
};

/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */
function listarPedidosUsuario(req, res) {
    let id = req.params.id;
    let queryPedidos = `SELECT detalle_pedidos.id_pedido, pedidos.usuario, pedidos.fecha, pedidos.estado, detalle_pedidos.producto, detalle_pedidos.cantidad, pedidos.total FROM detalle_pedidos INNER JOIN pedidos ON detalle_pedidos.id_pedido = pedidos.id_pedido WHERE pedidos.usuario = ${id}`;

    mysqlConnection.query(queryPedidos, (err, result) => {
        if (!err) {
            let objetoResultado = [];
            result.forEach((pedidoBD) => {
                let elPedidoNoEstaAgregado = true;

                objetoResultado.forEach((pedidoYaAgregado) => {
                    if (pedidoYaAgregado.id_pedido === pedidoBD.id_pedido) {
                        elPedidoNoEstaAgregado = false;
                        pedidoYaAgregado.descripcion.push(
                            {
                                producto: pedidoBD.producto,
                                cantidad: pedidoBD.cantidad,
                            }
                        )
                    }
                })

                if (elPedidoNoEstaAgregado) {
                    const nuevoObjetoPedido = {
                        id_pedido: pedidoBD.id_pedido,
                        usuario: pedidoBD.usuario,
                        fecha: pedidoBD.fecha,
                        estado: pedidoBD.estado,
                        descripcion: [],
                        total: pedidoBD.total,
                    }
                    nuevoObjetoPedido.descripcion.push(
                        {
                            producto: pedidoBD.producto,
                            cantidad: pedidoBD.cantidad,
                        }
                    )
                    objetoResultado.push(nuevoObjetoPedido);
                }
            })
            res.status(200).send(objetoResultado);
        } else {
            console.log(err);
        }
    })
};

/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */
function actualizarEstadoPedido(req, res) {
    let id = req.params.id;
    let estado = req.body.estado;
    let queryEstadoPedidos = `UPDATE pedidos SET estado = ${estado} WHERE id_pedido = ${id}`;

    mysqlConnection.query(queryEstadoPedidos, (err, result) => {
        if (err) throw err;
        res.status(200).send("Estado actualizado con Éxito!");
    })
};

/* ############# AGREGAR PRODUCTO ############# */
function agregarProducto(req, res) {
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
function editarProducto(req, res) {
    let id = req.params.id;
    let { nombre, precio, descripcion, item } = req.body;
    let queryActualizarProducto = `UPDATE productos SET nombre = '${nombre}', precio = ${precio}, descripcion = '${descripcion}', item = '${item}' WHERE id_producto = ${id}`;

    mysqlConnection.query(queryActualizarProducto, (err, result) => {
        if (err) throw err;
        res.status(200).send("Producto actualizado con Éxito!");
    })
};

/* ############# ELIMINAR PRODUCTO ############ */
function eliminarProducto(req, res) {
    let id = req.params.id;
    let queryEliminarProducto = `DELETE FROM productos WHERE id_producto = ${id}`;

    mysqlConnection.query(queryEliminarProducto, (err, result) => {
        if (err) throw err;
        res.status(200).send("Producto eliminado con Éxito!");
    })
};


/* ############## ELIMINAR PEDIDO ############# */
function eliminarPedido(req, res) {
    let id = req.params.id;
    let queryEliminarPedido = `DELETE FROM pedidos WHERE id_pedido = ${id}`;

    mysqlConnection.query(queryEliminarPedido, (err, result) => {
        if (err) throw err;
        res.status(200).send("Pedido eliminado con Éxito!");
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
    eliminarPedido: eliminarPedido,
}