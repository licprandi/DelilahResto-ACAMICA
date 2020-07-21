const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const controladores = require('../controladores/controladores')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const mysqlConnection = require('../DB/delilahDB');


/* ############### NUEVO USUARIO ############## */
router.post('/usuarios', controladores.crearUsuario);

/* ############## LISTAR USUARIOS ############# */
router.get('/usuarios', controladores.listarUsuarios);

/* ############# LISTAR PRODUCTOS ############# */
router.get('/productos', controladores.listarProductos);

/* ########## LISTAR PRODUCTOS POR ID ######### */

router.get('/productos/:id', (req, res) => {
    let id = req.params.id;

    let queryProductos = `SELECT t.id_producto, t.nombre, t.precio, t.descripcion, t.item FROM productos t WHERE id_producto = ${id}`;

    mysqlConnection.query(queryProductos, (err, result) => {
        if (err) throw err;

        let producto = {
            nombre: result[0].nombre,
            precio: result[0].precio,
            descripcion: result[0].descripcion,
            item: result[0].item
        }
        res.send(producto);
    })
});


/* ############## GENERAR PEDIDO ############## */

router.post('/pedidos', (req, res) => {
    const { usuario, descripcion, metodo_pago, cantidad, total } = req.body;
    let queryInsertPedido = `INSERT INTO pedidos (usuario, descripcion, metodo_pago, cantidad, total) 
        VALUES ('${usuario}', '${descripcion}', '${metodo_pago}', '${cantidad}', '${total}')`;

    mysqlConnection.query(queryInsertPedido, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Pedido generado con Éxito!');
    });
});


/* ############## LISTAR PEDIDOS ############## */

router.get('/pedidos', (req, res) => {
    mysqlConnection.query('SELECT * FROM pedidos', (err, result) => {
        if (!err) {
            res.json(result);
        } else {
            console.log(err);
        }
    })
});

/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */

router.get('/pedidos/:id', (req, res) => {
    let id = req.params.id;

    let queryPedidos = `SELECT id_pedido, usuario, DATE_FORMAT(fecha, "%d %M %Y %T"), descripcion, estado, metodo_pago, cantidad, total FROM pedidos WHERE usuario = ${id}`;

    mysqlConnection.query(queryPedidos, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});


/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */

router.patch('/pedidos/:id', (req, res) => {
    let id = req.params.id;
    let estado = req.body.estado;

    let queryEstadoPedidos = `UPDATE pedidos SET estado = ${estado} WHERE usuario = ${id}`;

    mysqlConnection.query(queryEstadoPedidos, (err, result) => {
        if (err) throw err;
        res.send("Estado actualizado con Éxito!");
    })
});


/* ############ AGREGAR UN PRODUCTO ########### */

router.post('/productos', (req, res) => {

    const { nombre, precio, descripcion, item } = req.body;
    let queryInsertProducto = `INSERT INTO productos (nombre, precio, descripcion, item) 
        VALUES ('${nombre}', '${precio}', '${descripcion}', '${item}')`;

    mysqlConnection.query(queryInsertProducto, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Producto Guardado con Éxito');
    });
});


/* ############## EDITAR PRODUCTO ############# */

router.patch('/productos/:id', (req, res) => {
    let id = req.params.id;
    let { nombre, precio, descripcion, item } = req.body;
    // let idEstado = req.body.estado;

    let queryActualizarProducto = `UPDATE productos SET nombre = '${nombre}', precio = ${precio}, descripcion = '${descripcion}', item = '${item}' WHERE id_producto = ${id}`;

    mysqlConnection.query(queryActualizarProducto, (err, result) => {
        if (err) throw err;

        res.send("Producto actualizado con Éxito!");
    })
});


/* ########### ELIMINAR UN PRODUCTO ########### */


router.delete('/productos/:id', (req, res) => {
    let id = req.params.id;
    // let idEstado = req.body.estado;

    let queryEliminarProducto = `DELETE FROM productos WHERE id_producto = ${id}`;

    mysqlConnection.query(queryEliminarProducto, (err, result) => {
        if (err) throw err;

        res.send("Producto eliminado con Éxito!");
    })
});






module.exports = router;