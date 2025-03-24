const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./src/routes/alunoRoutes');

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://wagnerdaniell06:iC0SHlLcrEb602NU@cluster0.c8fsr.mongodb.net/",{
    serverSelectionTimeoutMS: 30000
})

.then(() => console.log('Conectado ao MongoDB com sucesso!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 200, message: 'a api ta viva!' });
});

app.use('/api', alunoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});