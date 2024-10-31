const Usuario = require('../models/user');
const jwt = require('jsonwebtoken');

const UsuarioController = {
    register: (req, res) => {
        const { nome, senha } = req.body;
        Usuario.findByName(nome, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro no banco de dados.' });
            if (result.length > 0) return res.status(400).json({ error: 'Usuário já existe.' });

            Usuario.create(nome, senha, (err, result) => {
                if (err) return res.status(500).json({ error: 'Erro ao registrar usuário.' });
                res.status(201).json({ message: 'Usuário registrado com sucesso.' });
            });
        });
    },
    login: (req, res) => {
        const { nome, senha } = req.body;

        console.log('Tentativa de login com nome:', nome);

        Usuario.login(nome, senha, (err, usuario) => {
            if (err) return res.status(500).json({ error: 'Erro no banco de dados.' });
            
            if (usuario === null) {
                return res.status(404).json({ error: 'Usuário não encontrado.' }); // Usuário não existe
            }

            if (usuario === false) {
                return res.status(401).json({ error: 'Senha incorreta.' }); // Senha incorreta
            }

            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            // Gerar o token JWT se o login for bem-sucedido
            const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '2m' });

            console.log('JWT gerado com sucesso:', token);

            // Retornar o token para o cliente
            res.status(200).json({ message: 'Login bem-sucedido!', token });
        });
    }
    // Outros métodos (atualizar, deletar, etc.)
};

module.exports = UsuarioController;
