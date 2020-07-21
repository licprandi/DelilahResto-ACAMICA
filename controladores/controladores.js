const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const mysqlConnection = require('../DB/delilahDB');

/* ############### CREAR USUARIO ############## */

let crearUsuario = (req, res) => {
    const { usuario, password, nombre_apellido, email, telefono, direccion_envio, administrador } = req.body;
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

/* ############## GENERAR PEDIDO ############## */

/* ############## LISTAR PEDIDOS ############## */

/* ####### LISTAR PEDIDOS DE UN USUARIO ####### */

/* ######## ACTUALIZAR ESTADO DE PEDIDO ####### */

/* ############# AGREGAR PRODUCTO ############# */

/* ############## EDITAR PRODUCTO ############# */

/* ############# ELIMINAR PRODUCTO ############ */




/* ############################################ */
/*               ESPORTAR MODULOS               */
/* ############################################ */

module.exports = {
    listarUsuarios: listarUsuarios,
    crearUsuario: crearUsuario,
    listarProductos: listarProductos,
}