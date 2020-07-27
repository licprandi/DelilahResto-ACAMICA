const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const mysqlConnection = require('../DB/delilahDB');
const secretauth = require('../JWT/jwt');


/* ############### CREAR USUARIO ############## */
let crearUsuario = (req, res) => {
    let { usuario, password, nombre_apellido, email, telefono, direccion_envio } = req.body;

    if (usuario && password && nombre_apellido && email && telefono && direccion_envio) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                res.status(500).send("No se pudo registrar el usuario");
                return;
            }
            password = hash;

            let queryInsertUsuario = `INSERT INTO usuarios (usuario, password, nombre_apellido, email, telefono, direccion_envio) 
                    VALUES ('${usuario}', '${password}', '${nombre_apellido}', '${email}', '${telefono}', '${direccion_envio}')`;

            mysqlConnection.query(queryInsertUsuario, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send('Usuario Creado con Éxito');
            });
        });
    } else {
        res.status(400).send("Error al registrar el Usuario, faltan datos!");
    };
};


/* ################ CREAR ADMIN ############### */
let crearAdmin = (req, res) => {
    let { usuario, password, nombre_apellido, email, telefono, direccion_envio, administrador } = req.body;
    if (usuario && password && nombre_apellido && email && telefono && direccion_envio && administrador) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                res.status(500).send("No se pudo registrar el usuario");
                return;
            }
            password = hash;

            let queryInsertAdmin = `INSERT INTO usuarios (usuario, password, nombre_apellido, email, telefono, direccion_envio, administrador) 
                VALUES ('${usuario}', '${password}', '${nombre_apellido}', '${email}', '${telefono}', '${direccion_envio}', '${administrador}')`;

            mysqlConnection.query(queryInsertAdmin, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send('Usuario Administrador Creado con Éxito');
            });
        });
    } else {
        res.status(400).send("Error al registrar el Administrador, faltan datos!");
    }
};


/* ############## LOGIN USUARIOS ############## */
let login = (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;

    let queryLogin = `SELECT id_usuario, usuario, password, administrador FROM usuarios WHERE usuario = '${usuario}'`;

    mysqlConnection.query(queryLogin, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res.status(400).send("El usuario o contraseña son Incorrectos!");
            return;
        }
        bcrypt.compare(password, result[0].password, function (err, bcryptResult) {
            if (err) {
                res.status(500).send("No es posible validar el password!");
                return;
            }
            if (!bcryptResult) {
                res.status(400).send("USUARIO O CONTRASEÑA INCORRECTO");
                return;
            }

            // payload
            let payload = {
                usuario: result[0].usuario,
                id_usuario: result[0].id_usuario,
                administrador: result[0].administrador,
            }

            // token.
            jwt.sign(payload, secretauth, (err, token) => {
                if (err) {
                    res.status(500).send("No es posible iniciar sesion.");
                    return;
                }

                let resultado = {
                    usuario: result[0].usuario,
                    id_usuario: result[0].id_usuario,
                    administrador: result[0].administrador,
                    token: token,
                };
                res.send(resultado);
            });
        });
    })
}

/* ############################################ */
/*               EXPORTAR MODULOS               */
/* ############################################ */

module.exports = {
    crearUsuario: crearUsuario,
    crearAdmin: crearAdmin,
    login: login,
}