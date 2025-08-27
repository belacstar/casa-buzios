const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const contatoRoutes = require('./routes/contato.routes'); // alterado

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa o app
const app = express();
app.use(cors());
app.use(express.json());

// Inicializa o Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
app.set('firestore', db); // envia Firestore para uso nas rotas

// Rota principal de contatos
app.use('/contato', (req, res, next) => {
    req.db = db; // disponibiliza o Firestore no req para os controllers
    next();
}, contatoRoutes);

module.exports = app;