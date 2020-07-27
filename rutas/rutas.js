const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const controladores = require('../controladores/controladores');
const autenticacion = require('../controladores/autenticacion');
const middleware = require ('../middlewares/middleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



/* ############### NUEVO USUARIO ############## */
router.post('/usuarios', middleware.validarUsuarioExistente, autenticacion.crearUsuario);


/* ################ NUEVO ADMIN ############### */
router.post('/admin',middleware.validarUsuarioExistente, autenticacion.crearAdmin);

/* ################### LOGIN ################## */
router.post('/login', autenticacion.login);

/* ############## LISTAR USUARIOS ############# */
router.get('/usuarios', [middleware.autenticado, middleware.soloAdministradores], controladores.listarUsuarios);

/* ############# LISTAR PRODUCTOS ############# */
router.get('/productos', middleware.autenticado, controladores.listarProductos);

/* ########## LISTAR PRODUCTOS POR ID ######### */
router.get('/productos/:id', middleware.autenticado, controladores.listarProductosId);

/* ############## GENERAR PEDIDO ############## */
router.post('/pedidos', middleware.autenticado, controladores.generarPedido);

/* ############## LISTAR PEDIDOS ############## */
router.get('/pedidos', [middleware.autenticado, middleware.soloAdministradores], controladores.listarPedidos);
    
/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */
router.get('/pedidos/:id', [middleware.autenticado, middleware.validarIdUsuario], controladores.listarPedidosUsuario);

/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */
router.put('/pedidos/:id', [middleware.autenticado, middleware.soloAdministradores], controladores.actualizarEstadoPedido);

/* ############ AGREGAR UN PRODUCTO ########### */
router.post('/productos', [middleware.autenticado, middleware.soloAdministradores], controladores.agregarProducto);

/* ############## EDITAR PRODUCTO ############# */
router.put('/productos/:id', [middleware.autenticado, middleware.soloAdministradores], controladores.editarProducto);

/* ########### ELIMINAR UN PRODUCTO ########### */
router.delete('/productos/:id', [middleware.autenticado, middleware.soloAdministradores], controladores.eliminarProducto);

module.exports = router;