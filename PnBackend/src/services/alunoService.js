const Aluno = require('../models/alunoEntity');
const Joi = require('joi');

const alunoValidator = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  curso: Joi.string().required(),
  periodo: Joi.number().integer().min(1).required(),
  turma: Joi.string().required(),
  turno: Joi.string().valid('Manhã', 'Tarde', 'Noite').required(),
  endereco: Joi.string().required(),
  telefone: Joi.string().pattern(/^\d{10,11}$/).required(),
});

const executeCriarAluno = async (data) => {
  try {
    const {error} = alunoValidator.validate(data);
    if (error) {
      throw Error("Dados invalidos!")
    };

    const aluno = new Aluno(data);
    await aluno.save();
    return aluno;
  } catch (error) {
    throw new Error('Erro ao criar o aluno: ' + error.message);
  }
};

const executeListarAluno = async () => {
  try {
    return await Aluno.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error('Erro ao listar os alunos: ' + error.message);
  }
};

const executeUpdateAluno = async (data, id) => {
  try {
    const { nome, email, curso, periodo, turma, turno, endereco, telefone } = data;
    const updateFields = { nome, email, curso, periodo, turma, turno, endereco, telefone };

    const {error} = alunoValidator.validate(data);
    if (error) {
      throw Error("Dados invalidos!");
    };
    
    if (!id) {
      throw new Error("ID do aluno é obrigatório para atualização.");
    }

    const aluno = await Aluno.findById(id);
    if (!aluno) {
      throw new Error("Aluno não encontrado.");
    }

    Object.assign(aluno, updateFields);
    await aluno.save();

    return aluno;
  } catch (error) {
    throw new Error('Erro ao atualizar o aluno: ' + error.message);
  }
};

const executeDeletarAluno = async (id) => {
  try {
    if (!id) {
      throw new Error("ID do aluno é obrigatório para deleção.");
    }

    const aluno = await Aluno.findByIdAndDelete(id);
    if (!aluno) {
      throw new Error("Aluno não encontrado.");
    }

    return aluno;
  } catch (error) {
    throw new Error('Erro ao deletar o aluno: ' + error.message);
  }
};


module.exports = { executeCriarAluno, executeListarAluno, executeUpdateAluno, executeDeletarAluno };