document.addEventListener("DOMContentLoaded", () => {
  const listaJogos = document.getElementById("favoritosJogos");
  const listaJogadores = document.getElementById("favoritosJogadores");
  const listaSalas = document.getElementById("favoritosSalasMaisAcessadas");

  function criarCard(jogo) {
    const card = document.createElement("div");
    card.className = "card card-jogo mb-3";
    card.setAttribute("data-nome", jogo.nome.toLowerCase());
    card.innerHTML = `
      <img src="${jogo.imagem}" class="card-img-top" alt="${jogo.nome}" />
    `;
    listaJogos.appendChild(card);
  }

  function criarCardJogador(jogador) {
    const col = document.createElement("div");
    col.className = "col-12 mb-4";
    col.innerHTML = `
      <div class="container-card">
        <div class="card-jogador d-flex align-items-center justify-content-between" data-nome="${jogador.nome.toLowerCase()}">
          <div class="d-flex align-items-center">
            <img src="images/user.png" alt="${
              jogador.nome
            }" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
              <div style="position: relative;">
                <span class="status ${jogador.status}"></span>
                <strong class="nome-jogador">${jogador.nome}</strong>
              </div>
            </div>
          </div>
          <button class="btn btn-success btn-convidar" data-jogador="${
            jogador.nome
          }">Convidar</button>
        </div>
      </div>
    `;
    listaJogadores.appendChild(col);
  }

  function criarCardSala(sala) {
    const col = document.createElement("div");
    col.className = "col-12 mb-3";

    const card = document.createElement("div");
    card.className = "container-card card-sala";
    card.setAttribute("data-nome", sala.nome.toLowerCase());

    card.innerHTML = `
    <div class="sala">
      <div class="sala-info">
        <img src="${sala.imagem}" alt="${sala.nome}" class="img-jogo-sala" />
        <div class="sala-detalhes">
          <strong class="nome-sala">${sala.nome}</strong>
          <p>${sala.participantes} participantes</p>
          <small>Entradas recentes: ${sala.entradas}</small>
        </div>
      </div>
      <button class="btn-entrar" data-sala="${sala.nome}">Entrar</button>
    </div>`;

    col.appendChild(card);
    listaSalas.appendChild(col);
  }

  // Buscar os dados do JSON
  fetch("./scripts/db.json")
    .then((response) => response.json())
    .then((data) => {
      data.jogos.forEach(criarCard);
      data.jogadores.forEach(criarCardJogador);
      data.salas.forEach(criarCardSala);
    })
    .catch((error) => {
  console.error("Erro ao carregar db.json:", error);
  alert("Não foi possível carregar os dados. Por favor, tente novamente mais tarde.");
});

  // Notificações
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-convidar")) {
      const nome = e.target.dataset.jogador;
      criarNotificacao(`Você convidou o ${nome}`);
    }

    if (e.target.classList.contains("btn-entrar")) {
      const sala = e.target.dataset.sala;
      criarNotificacao(`Você entrou na sala ${sala}`);
    }
  });

  // Campo de pesquisa
  document.getElementById("botaoBusca").addEventListener("click", function () {
    const buscaContainer = document.querySelector(".busca-container");
    buscaContainer.classList.toggle("busca-ativa");
    document.getElementById("campoBusca").focus();
  });
  // Filtro de pesquisa
  document.getElementById("campoBusca").addEventListener("input", function () {
    const termo = this.value.toLowerCase();

    // Jogadores
    document
      .querySelectorAll("#favoritosJogadores [data-nome]")
      .forEach((el) => {
        el.closest(".col-12").style.display = el.dataset.nome.includes(termo)
          ? ""
          : "none";
      });

    // Jogos
    document.querySelectorAll("#favoritosJogos [data-nome]").forEach((el) => {
      el.style.display = el.dataset.nome.includes(termo) ? "" : "none";
    });

    // Salas
    document
      .querySelectorAll("#favoritosSalasMaisAcessadas [data-nome]")
      .forEach((el) => {
        el.closest(".col-12").style.display = el.dataset.nome.includes(termo)
          ? ""
          : "none";
      });
  });

  // Função de notificação
  function criarNotificacao(texto) {
    $("#mensagemNotificacao").text(texto);
    $("#notificacaoBar").removeClass("d-none").fadeIn();

    setTimeout(function () {
      $("#notificacaoBar").fadeOut();
    }, 3000);
  }
});
