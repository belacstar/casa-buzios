exports.criarReserva = async (req, res) => {
    try {
        const db = req.db;
        const dados = req.body;

        // Novos campos obrigatórios
        const camposObrigatorios = [
            "nome",
            "telefone",
            "email",
            "dataInteresse",
            "numeroDias",
            "totalHospedes"
        ];
        const camposFaltando = camposObrigatorios.filter(campo => !dados[campo]);

        if (camposFaltando.length > 0) {
            return res.status(400).json({ erro: `Campos obrigatórios ausentes: ${camposFaltando.join(", ")}` });
        }

        if (parseInt(dados.numeroDias) < 3) {
            return res.status(400).json({ erro: "Número mínimo de diárias: 3" });
        }

        // Data de envio
        dados.dataEnvio = new Date();

        // Salvando contato (não é mais uma reserva)
        const contatoRef = await db.collection("contatos").add(dados);

        // Criar log
        await db.collection("logs_contatos").add({
            contatoId: contatoRef.id,
            nome: dados.nome,
            email: dados.email,
            data: new Date(),
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
            status: "Novo contato registrado"
        });

        // Placeholder para envio de e-mail (opcional)
        console.log(`[E-MAIL] Novo contato de ${dados.nome} registrado com sucesso.`);

        return res.status(201).json({ mensagem: "Contato registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar contato:", error);
        return res.status(500).json({ erro: "Erro ao salvar contato." });
    }
};