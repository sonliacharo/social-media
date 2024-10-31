const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');

  const criarUsuario = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      senha VARCHAR(100) NOT NULL
    );
  `;

  connection.query(criarUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela "usuarios":', err.message);
      return;
    }
    console.log('Tabela "usuarios" criada com sucesso!');

    const criarPostagens = `
      CREATE TABLE IF NOT EXISTS postagens (
        uid INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT NOT NULL,
        conteudo TEXT NOT NULL,
        imagem VARCHAR(255),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      );
    `;

    connection.query(criarPostagens, (err, result) => {
      if (err) {
        console.error('Erro ao criar tabela "postagens":', err.message);
        return;
      }
      console.log('Tabela "postagens" criada com sucesso!');
      connection.end();
    });
  });
});
