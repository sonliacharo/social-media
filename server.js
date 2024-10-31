const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usuarioRoutes = require('./app/routes/userRoutes');
const postagemRoutes = require('./app/routes/postRoutes');
const viewRoutes = require('./app/routes/viewRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/postagem', postagemRoutes);
app.use('/', viewRoutes);

app.use('/public', express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
