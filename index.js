const express = require("express");
const middleware = require ('./middlewares/middleware');

const app = express();

/* ############## CONFIGURACIONES ############# */

const PORT = process.env.PORT || 3000;

/* ################ MIDDLEWARES ############### */


/* ################### RUTAS ################## */

app.use(require('./rutas/rutas'));

/* ################## ERRORES ################# */
app.use(middleware.manejoDeErrores);

/* ################## SERVER ################## */

app.listen(PORT, () => {
    const date = new Date();
    console.log(`Server Delilah Resto funcionando en el puerto http://localhost:${PORT} \n${date}`);
});