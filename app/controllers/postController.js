const Postagem = require('../models/post');

const PostagemController = {
    createPost: (req, res) => {
        const { conteudo, imagem } = req.body;
        const usuarioId = req.userId;  // Assumindo que o middleware já autenticou o usuário

        Postagem.create(usuarioId, conteudo, imagem, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro ao adicionar postagem' });
            res.status(201).json({ message: 'Postagem adicionada com sucesso' });
        });
    },
    deletePost: (req, res) => {
        const postId = req.params.id;
        const usuarioId = req.userId;

        Postagem.delete(postId, usuarioId, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro ao deletar postagem' });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Postagem não encontrada' });

            res.status(200).json({ message: 'Postagem deletada com sucesso' });
        });
    }
};

module.exports = PostagemController;
