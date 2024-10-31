const db = require('../../config/database');

const Postagem = {
    create: (usuarioId, conteudo, imagem, callback) => {
        const query = 'INSERT INTO postagens (usuario_id, conteudo, imagem) VALUES (?, ?, ?)';
        db.query(query, [usuarioId, conteudo, imagem], callback);
    },
    delete: (postId, usuarioId, callback) => {
        const query = 'DELETE FROM postagens WHERE uid = ? AND usuario_id = ?';
        db.query(query, [postId, usuarioId], callback);
    },
    // Outros métodos como buscar postagens de um usuário, etc.
};

module.exports = Postagem;
