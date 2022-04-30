const express = require('express');
const usersRouter = require("./src/routes/users.route");
const app = express();
const PORT = process.env.PORT || 3050;


app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// Here add the new routers
app.use('/users', usersRouter);

// ----------------------------------------------------------------------------
// CRUD EJEMPLO
// app.get('/resumen', (req, res) => {
//     const sqlGetUsuarios = 'SELECT * FROM user';
//     connection.query(sqlGetUsuarios, (err, results) => {
//         if (err) throw err;
//         if (results.length > 0){
//             res.json(results);
//         } else {
//             res.send('Sin resultados');
//         }
//     });
// });

// app.put('/update/:id', (req, res) => {
//     const {id } = req.params;
//     const {email, direccion} = req.body;
//     const sqlUpdateUsuario = `UPDATE usuario SET Direccion = '${direccion}', Email = '${email}'  WHERE id = ${id}`;
//     connection.query(sqlUpdateUsuario, error => {
//         if (error) throw error;
//         res.send('Usuario actualizado correctamente');
//     });
// });

// app.delete('/delete/:id', (req, res) => {
//     const {id} = req.params;
//     const sqlDeleteUsuario = `DELETE FROM usuario WHERE id = ${id}`;
//     connection.query(sqlDeleteUsuario, error => {
//         if (error) throw error;
//         res.send('Usuario eliminado correctamente');
//     });
// });

// ----------------------------------------------------------------------------

// Summary Table
// app.get('/table', (req, res) => {
//         const sqlGetTablaResumen = `
//             SELECT ref.*, usr.name
//             FROM referral AS ref
//             INNER JOIN user AS usr ON ref.user = usr.id
//             ORDER BY ref.total DESC, ref.referred_quantity DESC`;
//         connection.query(sqlGetTablaResumen, (err, results) => {
//         if (err) {
//             res.send({"code": 500, "message": "Internal server error: Error getting data of referral"});
//         } else {
//             res.send({"code": 200, "message": "Success getting result", "result": results});
//         }
//     });
// });

// REGISTRAR

// function checkEmail(email, callback) {
//     const sqlCheckEmail = 'SELECT COUNT(*) AS exist FROM user WHERE email = ?';
//     connection.query(sqlCheckEmail, email,  (err, results) => {
//         if (err) {return callback(-1)}
//         else {return callback(results[0].exist)}
//     });
// }


// app.post('/insert', (req, res) => {
//     const sqlInsetUser = 'INSERT INTO user SET ?';
//     const usuarioObject = {
//         name: req.body.name,
//         email: req.body.email,
//         address: req.body.address,
//         sex: req.body.sex,
//         referral_link: "AAAAAHHHHHEEEEEIIIIICCCCCOOOOOEEEEEV"
//     };
//     checkEmail(req.body.email, function (userExists) {
//         console.log(userExists)
//         if (userExists == -1) {
//             res.send({"code": 500, "message": "Internal server error: Error checking if user exists"});
//         } else if (userExists > 0){
//             res.send({"code": 404, "message": "The user already exists"});
//         } else {
//             if (req.body.referral_link == null){
//                 console.log("PRIMERO")





//                 res.send({"code": 200, "message": "User created correctly"})
//             } else {
//                 console.log("SEGUNDO")




//                 res.send({"code": 200, "message": "User created correctly"})
//             }

//         }
//     } );

//     // Generar el codigo uuid
//     // Ver si viene el referral_link
//     // Caso 1 - Si viene el referral_link: Validar que el usuario que se inserta no existe
//     // Insertar el usuario que se acaba de registrar
//     // en la tabla de usuario, obtener id del usuario recien creado, usar este id para insertar
//     // en la tabla referred con un conteo  0 y con total 5000.
//     // buscar el referal link en la tabla de usuario, obtener el id, hacer join con referal,
//     // sumar +1 al contador y sumar 5000 al usuario que refirio.
//     // Caso 2 - No viene el referral_link: Validar que el usuario que se inserta no existe
//     // Insertar el usuario que se acaba de registrar
//     // en la tabla de usuario, obtener id del usuario recien creado, usar este id para insertar
//     // en la tabla referred con un conteo  0 y con total 0.



//     // connection.beginTransaction(function(err){
//     //     if (err) { throw err; }
//     //     connection.query(sqlInsetUser, usuarioObject, function(error, result, fields) {
//     //         if (error) {
//     //             return connection.rollback(function() {
//     //                 throw res.send({message: 'Error: User not created'});
//     //             });
//     //         } else {
//     //         connection.commit(function(err){
//     //             if (err) {
//     //                 return connection.rollback(function() {
//     //                     throw err;
//     //                 });
//     //             } else {res.send('User created correctly');}
//     //         });
//     //     }
//     //     });
//     // }
//     // );


// });


// -----------------------------------------------------------------------------------
// //Check connection

// connection.connect(error => {
//     // Caso de error de conexion
//     if (error) throw error;
//     // Caso de éxito
//     console.log('Database server running');
// });

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));


