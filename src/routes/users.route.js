// Include external modules
const express = require('express');
const usersController = require('../controllers/users.controller');
// Create new router object
const router = express.Router();

// Define endpoints related to users
router.post('/create', usersController.register);

// Export module with endpoints related to users
module.exports = router;