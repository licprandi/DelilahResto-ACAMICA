const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json())

const mysqlConnection = require('../DB/delilahDB');



// router.get('/prueba', (req, res) => {
//     res.send({
//         "vos": "lo lograste",
//         "sos": "un genio"
//     });
// })

const usuarios = [];

// router.get('/usuarios', (req, res) => {
//     res.json(usuarios);
// })


router.post('/usuarios', (req, res, next) => {
    const login = { id, usuario, pass, nombre_completo, email, direccion, telefono } = req.body;
    res.status(200).json('cargado correctamente');
    usuarios.push(login); // insertar en base de datos

    // if(id && usuario && pass && nombre_completo && email && direccion && telefono) {
    //     res.status(200).json('Usuario cargado correctamente');
    //     usuarios.push(login); // Insertar en base de datos
    // } else {
    //     res.status(400).json('Datos incompletos');
    // }
});

router.get('/usuarios', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, filas, campos) => {
        if (!err) {
            res.json(filas);
        } else {
            console.log(err);
        }
    })
})


router.get('/productos', (req, res) => {
    mysqlConnection.query('SELECT * FROM productos', (err, filas, campos) => {
        if (!err) {
            res.json(filas);
        } else {
            console.log(err);
            
        }
    })
})





/* ################# USUARIOS ################# */



module.exports = router;