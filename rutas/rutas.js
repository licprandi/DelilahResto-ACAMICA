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
router.get('/productos/:id', controladores.listarProductosId);

/* ############## GENERAR PEDIDO ############## */
router.post('/pedidos', controladores.generarPedido);

/* ############## LISTAR PEDIDOS ############## */
router.get('/pedidos', controladores.listarPedidos);
    
/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */
router.get('/pedidos/:id', controladores.listarPedidosUsuario);

/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */
router.patch('/pedidos/:id', controladores.actualizarEstadoPedido);

/* ############ AGREGAR UN PRODUCTO ########### */
router.post('/productos', controladores.agregarProducto);

/* ############## EDITAR PRODUCTO ############# */
router.put('/productos/:id', controladores.editarProducto);

/* ########### ELIMINAR UN PRODUCTO ########### */
router.delete('/productos/:id', controladores.eliminarProducto);

module.exports = router;