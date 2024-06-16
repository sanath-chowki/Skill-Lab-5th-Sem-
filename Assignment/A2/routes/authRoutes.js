const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', express.json(), authController.login);
router.post('/register', express.json(), authController.register);
router.get('/', authController.getAllUsers);
router.delete('/:userId', authController.deleteUser);
router.get('/:userId', authController.getUserById);

module.exports = router;