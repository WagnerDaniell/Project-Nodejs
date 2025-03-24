const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

router.post('/createdAluno', alunoController.criarAluno);
router.get('/listAluno', alunoController.listarAluno);
router.put('/updateAluno/:id', alunoController.atualizarAluno);
router.delete('/deleteAluno/:id', alunoController.deletarAluno);

module.exports = router;