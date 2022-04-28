const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();


app.use(bodyParser.json());

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

console.log(dbHost);

//Mysql
const connection =  mysql.createConnection({
    host: dbHost,
    user: dbUser, //'root',
    password: dbPass, //'Cata1048576_',
    database: dbName, //'currency_bird',
    port: dbPort
});

//Check connection
connection.connect(error => {
    // Caso de error de conexion
    if (error) throw error;
    // Caso de éxito
    console.log('Database server running');
});

app.listen(PORT, () => `Server running on port ${PORT}`);


