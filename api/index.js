const express = require('express');

const config = require('../config.js');
const user = require('./network.js');
const app = express();

/* -------------------------------------------------------------------------- */
/*                                   ROUTER                                   */
/* -------------------------------------------------------------------------- */

app.use('/api/user', user);



/* -------------------------------------------------------------------------- */
/*                                    PORT                                    */
/* -------------------------------------------------------------------------- */

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
    
});

