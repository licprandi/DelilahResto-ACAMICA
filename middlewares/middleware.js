const jwt = require("jsonwebtoken");
const secret = require("../JWT/jwt");
const mysqlConnection = require('../DB/delilahDB');

function manejoDeErrores(error, req, res, next) {
  if (error) {

    // loguearlo en un archivo.
    console.log("Trace del error", error);
    res.status(500).send("Ha ocurrido un error inesperado. Intente mas tarde.");
    return;
  }
  next();
}

function autenticado(req, res, next) {
  let auth = req.headers.authorization;

  if (!auth) {
    res.status(401).send("No tiene autorización!");
    return;
  }

  let token = auth.split(" ")[1];

  if (!token) {
    res.status(401).send("No tiene autorización!");
    return;
  }

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      res.status(500).send("Hubo un problema con la verificación! Por favor vuelva a ingresar.");
      return;
    }
    // req.userInfo = payload;
    next();
  });

}

function soloAdministradores(req, res, next) {
  if (req.userInfo.administrador != 1) {
    res.status(401).send("No tienes acceso para realizar esta consulta!");
    return;
  }
  next();
}


function validarIdUsuario(req, res, next) {
  let id = req.params.id;

  if (req.userInfo.id_usuario == id || req.userInfo.administrador == 1) {
    next();
  } else {
    res.status(401).send("No tienes acceso para realizar esta consulta!");
    return;
  }
}

/* ######### VALIDAR USUARIO EXISTENTE ######## */
let validarUsuarioExistente = (req, res, next) => {
  let usuario = req.body.usuario;

  mysqlConnection.query(`SELECT usuario FROM usuarios WHERE usuario = '${usuario}'`, (err, result) => {
    if (!err) {
      if (result.length !== 0) {
        res.status(400).send('El Nombre de Usuario ya existe! Por favor elija otro');
      } else {
        next();
      }
    } else {
      console.log(err);
    }
  })
};


module.exports = {
  manejoDeErrores: manejoDeErrores,
  autenticado: autenticado,
  soloAdministradores: soloAdministradores,
  validarIdUsuario: validarIdUsuario,
  validarUsuarioExistente: validarUsuarioExistente,
}