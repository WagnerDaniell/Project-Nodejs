const { executeListarAluno } = require('../services/alunoService');
const { executeCriarAluno } = require('../services/alunoService');
const alunoService = require('../services/alunoService');

const criarAluno = async (req, res) => {
  try {
    const { nome, email, curso, periodo, turma,turno,endereco,telefone } = req.body;

    const Aluno = await alunoService.executeCriarAluno(req.body);
    res.status(201).json({ message: 'Aluno cadastrado com sucesso.' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarAluno = async (req, res) => {
  try {
    const aluno = await alunoService.executeListarAluno();
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const alunoAtualizado = await alunoService.executeUpdateAluno(req.body, id);
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const alunoDeletado = await alunoService.executeDeletarAluno(id);
    res.json({ message: 'Aluno deletado com sucesso', aluno: alunoDeletado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { criarAluno, listarAluno, atualizarAluno, deletarAluno };