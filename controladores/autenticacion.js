const jwt = require('jsonwebtoken');
const config = require("../config");
const bcrypt = require('bcrypt');
const connection = require("../database");
const saltRounds = 10;

function registro(req, res) {

    let user = req.body;

    if(!user.userName || !user.password || !user.email) {
        res.status(400).send("Faltan datos.");
        return;
    }

    // TODO: ejecutar un select para ver si el userName esta siendo utilizado.

    // hashearle el pass
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        
        if(err) {
            res.status(500).send("No se pudo registrar el usuario");
            return;
        }
        
        user.password = hash;

        // usuarios.push(user);
        let query = `insert into usuarios (username, password) values ('${user.userName}', '${user.password}')`;
        connection.query(query, function (error, results, fields) {
            
            if (error) throw error;
            
            res.send(user);
            
            //console.log('el resultado de la query es: ', results);
            
            //console.log('el resultado de la query es fields: ', fields);
        });
    });
}

function login(req, res) {

    let nombreUsuario = req.body.userName;
    let password = req.body.password;

    // validar que el usuario exista.
    //let usr = usuarios.find(x => x.userName == nombreUsuario);

    let querySelect = `SELECT id, username, password FROM usuarios 
    WHERE username = '${nombreUsuario}'`;

    connection.query(querySelect, function(error, result) {

        if(error) throw error;

        if(result.length == 0) {
            res.status(400).send("Usuario o contraseña incorrectos.");
            return;
        }

        bcrypt.compare(password, result[0].password, function(err, bcryptResult) {
            
            if(err) {
                res.status(500).send("NO ES POSIBLE VALIDAR EL PASSWORD.");
                return;
            }
            
            if(!bcryptResult) {
                res.status(400).send("USUARIO O CONTRASEÑA INCORRECTO.");
                return;
            }

            let payload = {
                nombreUsuario: result[0].username,
                idUsuario: result[0].id,
                rol: 'administrador'
                
            }

            // generar el token.
            jwt.sign(payload, config.secretAuth, (error, token) => {
        
                if(error) {
                    res.status(500).send("No es posible iniciar sesion.");
                    return;
                }
                
                // xxxxxx.xxxxxxxxxxx.xxxxxx
                let resultado = {
                    usuario: result[0].username,
                    token: token
                };
        
                res.send(resultado);
            });

        });
    });
}

module.exports = {
    registro: registro,
    login: login
}