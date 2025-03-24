const atualizarAluno = async(event) => {
    event.preventDefault();  

    var id = document.getElementById("id").value;

    const alunoData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        curso: document.getElementById("curso").value,
        periodo: document.getElementById("periodo").value,
        turma: document.getElementById("turma").value,
        turno: document.getElementById("turno").value,
        endereco: document.getElementById("endereco").value,
        telefone: document.getElementById("telefone").value
    };

    try{
        const response = await fetch(`http://localhost:3000/api/updateAluno/${id}`, {
            method: "PUT",  
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoData)  
        })

        if(response.ok){
            alert("Atualizado com sucesso!")
        }else{
            alert("Erro na hora de atualizar o aluno.")
        }

        
    }catch(error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao tentar atualizar o aluno.");
    };
}

document.getElementById("updateForm").addEventListener("submit", atualizarAluno);