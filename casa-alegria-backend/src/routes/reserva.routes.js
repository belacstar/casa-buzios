const express = require('express');
const router = express.Router();
const { criarReserva } = require('../controllers/reserva.controller');

// Rota POST para criação de reserva
router.post('/', criarReserva);

module.exports = router;
