const listarAlunos = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/listAluno');
        const alunos = await response.json();

        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = '';

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', aluno._id);
            tr.innerHTML = `
                <td>${aluno._id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.periodo}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.turno}</td>
                <td>${aluno.endereco}</td>
                <td>${aluno.telefone}</td>
                <td>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            studentsList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
    }
};

const deletarAluno = async (event) => {
    event.preventDefault();
    if (!event.target.classList.contains('delete-btn')) return;

    const row = event.target.closest('tr');
    const alunoId = row.getAttribute('data-id');

    try {
        const response = await fetch(`http://localhost:3000/api/deleteAluno/${alunoId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            alert('Erro ao excluir aluno');
            return;
        }

        alert("Sucesso ao deletar")

        listarAlunos();
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
    }
};

document.getElementById('studentsList').addEventListener('click', deletarAluno);


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
            alert('Erro ao cadastrar aluno');
        }

        alert("Sucesso ao cadastrar o Aluno")

        document.getElementById('studentForm').reset();
        listarAlunos();
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno');
    }
};

const form = document.getElementById('studentForm');
form.addEventListener('submit', cadastrarAluno);

// Quando recarregar a página, lista os alunos automaticamente
window.onload = listarAlunos;
