const express = require('express');
const UsuarioController = require('../controllers/userController');
const router = express.Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);

module.exports = router;
