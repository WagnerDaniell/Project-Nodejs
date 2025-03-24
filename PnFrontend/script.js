const listarAlunos = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/listAluno');
        const alunos = await response.json();

        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = '';

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.periodo}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.turno}</td>
                <td>${aluno.endereco}</td>
                <td>${aluno.telefone}</td>
            `;
            studentsList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
    }
};

const cadastrarAluno = async (event) => {
    event.preventDefault(); 

    const alunoData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        curso: document.getElementById('curso').value,
        periodo: document.getElementById('periodo').value,
        turma: document.getElementById('turma').value,
        turno: document.getElementById('turno').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/createdAluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar aluno');
        }

        document.getElementById('studentForm').reset();
        listarAlunos();
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno');
    }
};

const form = document.getElementById('studentForm');
form.addEventListener('submit', cadastrarAluno);

// Quando recarregar vai recarregar a bomba da lista
window.onload = listarAlunos;
