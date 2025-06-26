let salas = JSON.parse(localStorage.getItem('salas')) || [];

function criarSala() {
  const jogo = document.getElementById('jogo').value;
  const nomeSala = document.getElementById('nomeSala').value.trim();

  if (!nomeSala) return alert("Insira um nome para a sala.");

  const novaSala = {
    id: Date.now(),
    jogo,
    nomeSala,
    usuarios: []
  };

  salas.push(novaSala);
  salvar();
  atualizarExibicao();
}

function adicionarUsuario(salaId) {
  const nome = prompt("Nome do usuário:");
  if (!nome) return;

  const rank = prompt("Rank do usuário (ex: Bronze, Prata, Ouro):");
  if (!rank) return;

  const sala = salas.find(s => s.id === salaId);
  if (sala) {
    sala.usuarios.push({ nome, rank });
    salvar();
    atualizarExibicao();
  }
}

function salvar() {
  localStorage.setItem('salas', JSON.stringify(salas));
}

function atualizarExibicao() {
  const container = document.getElementById('salasContainer');
  container.innerHTML = "";

  salas.forEach(sala => {
    const div = document.createElement("div");
    div.className = "card mb-3";
    div.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${sala.nomeSala} - <span class="text-muted">${sala.jogo}</span></h5>
        <ul class="list-group list-group-flush mb-2">
          ${sala.usuarios.map(u => `<li class="list-group-item">${u.nome} - ${u.rank}</li>`).join("") || "<li class='list-group-item'>Nenhum usuário</li>"}
        </ul>
        <button class="btn btn-sm btn-success" onclick="adicionarUsuario(${sala.id})">Adicionar Usuário</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function exportarJSON() {
  const blob = new Blob([JSON.stringify(salas, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "salas.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importarJSON() {
  const input = document.getElementById("importarArquivo");
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const dados = JSON.parse(e.target.result);
      if (Array.isArray(dados)) {
        salas = dados;
        salvar();
        atualizarExibicao();
      } else {
        alert("Arquivo inválido.");
      }
    } catch {
      alert("Erro ao importar JSON.");
    }
  };
  reader.readAsText(file);
}

atualizarExibicao(); // Carrega ao iniciar
