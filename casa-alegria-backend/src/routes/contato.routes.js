const express = require('express');
const router = express.Router();

// POST - Criar novo contato
router.post('/', async (req, res) => {
    try {
        const { nome, email, telefone, mensagem } = req.body;
        
        // Validação básica
        if (!nome || !email || !mensagem) {
            return res.status(400).json({
                error: 'Nome, email e mensagem são obrigatórios'
            });
        }

        // Adiciona o contato ao Firestore
        const docRef = await req.db.collection('contatos').add({
            nome,
            email,
            telefone: telefone || '',
            mensagem,
            createdAt: new Date()
        });

        res.status(201).json({
            id: docRef.id,
            message: 'Contato enviado com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao salvar contato:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

// GET - Listar todos os contatos (para admin)
router.get('/', async (req, res) => {
    try {
        const snapshot = await req.db.collection('contatos').orderBy('createdAt', 'desc').get();
        const contatos = [];
        
        snapshot.forEach(doc => {
            contatos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(contatos);

    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

// GET - Buscar contato por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await req.db.collection('contatos').doc(req.params.id).get();
        
        if (!doc.exists) {
            return res.status(404).json({
                error: 'Contato não encontrado'
            });
        }

        res.json({
            id: doc.id,
            ...doc.data()
        });

    } catch (error) {
        console.error('Erro ao buscar contato:', error);
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
});

module.exports = router;
