const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifier=require("../middleware")

router.post('/login', verifier(["username","password"]), authController.login);
router.post('/register', verifier(["username","password"]), authController.register);

module.exports = router;