const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController');

router.post('/', registerUser);     // Register Route
router.post('/login', authUser);    // Login Route

module.exports = router;