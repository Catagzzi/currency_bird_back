const express = require('express');
const usersRouter = require("./src/routes/users.route");
let cors = require(cors);
const app = express();
const PORT = process.env.PORT || 3050;
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// Here add the new routers
app.use('/users', usersRouter);

// Serve the app
app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));


