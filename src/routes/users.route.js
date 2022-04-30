// Include external modules
const express = require('express');
const usersController = require('../controllers/users.controller');
// Create new router object
const router = express.Router();

// Define endpoints related to users
router.post('/register', usersController.register);
router.get('/summary_table', usersController.getTable);
router.post('/referral/create', usersController.getReferralLink);

// Export module with endpoints related to users
module.exports = router;