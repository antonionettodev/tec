const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host:'localhost',
  user: 'oabteste',
  password: 'abc123',
  database: 'oab_test',
});

app.post('/validar-oab', (req, res) => {
    const { oab, seguranca, senha } = req.body;
  
    // Verifique se oab e número existem na tabela
    const sql = 'SELECT * FROM test WHERE oab = ? AND seguranca = ?';
    const values = [oab, seguranca];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no servidor' });
      } else if (results.length === 0) {
        // Se não houver resultados, significa que OAB e número não correspondem a nenhum registro
        res.status(400).json({ error: 'OAB e número não encontrados' });
      } else {
        // OAB e número correspondem a um registro, atualize a coluna senha
        const updateSql = 'UPDATE test SET senha = ? WHERE oab = ? AND seguranca = ?';
        const updateValues = [senha, oab, seguranca];
  
        connection.query(updateSql, updateValues, (updateErr) => {
          if (updateErr) {
            console.error(updateErr);
            res.status(500).json({ error: 'Erro ao atualizar a senha' });
          } else {
            res.json({ message: 'Senha atualizada com sucesso' });
          }
        });
      }
    });
  });
  
const port = process.env.PORT || 8800;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
