const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Banco de Dados SQLite
const db = new sqlite3.Database('./banco.db');

// Criação da tabela se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca TEXT,
        modelo TEXT,
        ano INTEGER,
        cor TEXT,
        preco REAL,
        km INTEGER,
        status TEXT
    )
`);

// Rotas

// Listar todos
app.get('/veiculos', (req, res) => {
    db.all('SELECT * FROM veiculos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Cadastrar novo
app.post('/veiculos', (req, res) => {
    const { marca, modelo, ano, cor, preco, km, status } = req.body;
    db.run(
        `INSERT INTO veiculos (marca, modelo, ano, cor, preco, km, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [marca, modelo, ano, cor, preco, km, status],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Remover
app.delete('/veiculos/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM veiculos WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Veículo removido' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});