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

//Mysql
const connection =  mysql.createConnection({
    host: dbHost,
    user: dbUser, //'root',
    password: dbPass, //'Cata1048576_',
    database: dbName, //'currency_bird',
    port: 3306
});

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// ----------------------------------------------------------------------------
// CRUD EJEMPLO
app.get('/resumen', (req, res) => {
    const sqlGetTablaResumen = 'SELECT * FROM usuario';
    connection.query(sqlGetTablaResumen, (err, results) => {
        if (err) throw err;
        if (results.length > 0){
            res.json(results);
        } else {
            res.send('Sin resultados');
        }
    });
});

app.post('/agregar', (req, res) => {
    const sqlInsetUsuario = 'INSERT INTO usuario SET ?';
    const usuarioObject = {
        nombre: req.body.nombre,
        email: req.body.email,
        direccion: req.body.direccion,
        sexo: req.body.sexo
    };
    connection.query(sqlInsetUsuario, usuarioObject, error => {
        if (error) throw error;
        res.send('Usuario creado correctamente');
    })
});

app.put('/update/:id', (req, res) => {
    const {id } = req.params;
    const {email, direccion} = req.body;
    const sqlUpdateUsuario = `UPDATE usuario SET Direccion = '${direccion}', Email = '${email}'  WHERE id = ${id}`;
    console.log(direccion);
    connection.query(sqlUpdateUsuario, error => {
        if (error) throw error;
        res.send('Usuario actualizado correctamente');
    });
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sqlDeleteUsuario = `DELETE FROM usuario WHERE id = ${id}`;
    connection.query(sqlDeleteUsuario, error => {
        if (error) throw error;
        res.send('Usuario eliminado correctamente');
    });
});
// ----------------------------------------------------------------------------

//Check connection
connection.connect(error => {
    // Caso de error de conexion
    if (error) throw error;
    // Caso de éxito
    console.log('Database server running');
});

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));


