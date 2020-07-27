const mysql = require('mysql');
const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //Colocar usuario
    password: '', //Colocar su clave
    database: 'delilahdb'
});

mysqlconnection.connect(err => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Conectado Correctamente a la Base de Datos Delilah DB');
    }
})

module.exports = mysqlconnection;