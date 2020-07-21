const express = require("express");

const app = express();

/* ############## CONFIGURACIONES ############# */

const PORT = process.env.PORT || 3000;

/* ################ MIDDLEWARES ############### */


/* ################### RUTAS ################## */

app.use(require('./rutas/rutas'));

/* ################## SERVER ################## */

app.listen(PORT, () => {
    const date = new Date();
    console.log(`Server Delilah Resto funcionando en el puerto http://localhost:${PORT} \n${date}`);
});