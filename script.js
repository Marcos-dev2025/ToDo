function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto;

    li.onclick = function () {
        li.classList.toggle("concluida");
        salvarTarefas();
        atualizarContador();
    };

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        li.remove();
        salvarTarefas();
        atualizarContador();
    };

    li.appendChild(botaoExcluir);
    document.getElementById("listaTarefas").appendChild(li);

    input.value = "";
    salvarTarefas();
    atualizarContador();
}

function salvarTarefas() {
    const itens = [];
    document.querySelectorAll("#listaTarefas li").forEach(li => {
        const texto = li.firstChild.textContent.trim();
        const concluida = li.classList.contains("concluida");
        itens.push({ texto, concluida });
    });
    localStorage.setItem("tarefas", JSON.stringify(itens));
}

function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");
    if (!dados) return;

    const tarefas = JSON.parse(dados);
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = tarefa.texto;

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.onclick = function () {
            li.classList.toggle("concluida");
            salvarTarefas();
            atualizarContador();
        };

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Excluir";
        btnRemover.onclick = function () {
            li.remove();
            salvarTarefas();
            atualizarContador();
        };

        li.appendChild(btnRemover);
        document.getElementById("listaTarefas").appendChild(li);
    });

    atualizarContador();
}

function atualizarContador() {
    const tarefas = document.querySelectorAll("#listaTarefas li");
    const pendentes = Array.from(tarefas).filter(t => !t.classList.contains("concluida"));
    document.getElementById("contador").textContent = `📌 Tarefas pendentes: ${pendentes.length}`;
}

function alternarModo() {
    document.body.classList.toggle("escuro");
}

function filtrarTarefas(filtro) {
    const tarefas = document.querySelectorAll("#listaTarefas li");
    tarefas.forEach(tarefa => {
        tarefa.style.display = "flex"; // mostrar por padrão

        const estaConcluida = tarefa.classList.contains("concluida");

        if (filtro === "pendentes" && estaConcluida) {
            tarefa.style.display = "none";
        } else if (filtro === "concluidas" && !estaConcluida) {
            tarefa.style.display = "none";
        }
    });
}

carregarTarefas();
