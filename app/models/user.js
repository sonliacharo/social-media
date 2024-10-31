const db = require('../../config/database');
const bcrypt = require('bcryptjs');

const Usuario = {
    findByName: (nome, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nome = ?';
        db.query(query, [nome], callback);
    },
    create: (nome, senha, callback) => {
        const hashedPassword = bcrypt.hashSync(senha, 8);
        const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)';
        db.query(query, [nome, hashedPassword], callback);
    },
    login: (nome, senha, callback) => {
        console.log('Buscando usuário com nome:', nome);
        const query = 'SELECT * FROM usuarios WHERE nome = ?';

        db.query(query, [nome], (err, result) => {
            if (err) return callback(err);

            console.log('Resultado da consulta:', result);
            
            if (result.length === 0) return callback(null, null); // Usuário não encontrado

            const usuario = result[0];

            // Comparar a senha fornecida com a senha armazenada (criptografada)
            const isPasswordValid = bcrypt.compareSync(senha, usuario.senha);
            if (!isPasswordValid) return callback(null, false); // Senha inválida

            // Retornar o usuário se a senha estiver correta
            callback(null, usuario);
        });
    }
    // Outros métodos (login, delete, etc.)
};

module.exports = Usuario;
