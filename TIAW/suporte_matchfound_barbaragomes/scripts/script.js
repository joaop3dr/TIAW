$(document).ready(function () {
  let editandoIndex = null; // Identifica a solicitação que estou editando

  // Função para mostar as solicitações já criadas
  function obterSolicitacoes() {
    return JSON.parse(localStorage.getItem("suporte_usuario")) || [];
  }

  // Função para salvar as solicitações (pelo LocalStorage)
  function salvarSolicitacoes(solicitacoes) {
    localStorage.setItem("suporte_usuario", JSON.stringify(solicitacoes));
  }

  // Função para acompanhar as solicitações
  function mostrarAcompanhamento() {
    const solicitacoes = obterSolicitacoes();
    $("#form-suporte").addClass("d-none");
    $("#acompanhamento").removeClass("d-none");
    $("#btn-nova-solicitacao").removeClass("d-none");

    let html = "";
    solicitacoes.forEach((dados, index) => {
      html += `
        <div class="border rounded p-3 bg-white shadow-sm mb-3 position-relative">
          <button class="btn btn-sm btn-outline-danger position-absolute end-0 me-2" title="Apagar" onclick="apagarSolicitacao(${index})">
            <i class="bi bi-trash"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary position-absolute end-0 me-5" title="Editar" onclick="editarSolicitacao(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <p><strong>Nome:</strong> ${dados.nome}</p>
          <p><strong>Email:</strong> ${dados.email}</p>
          <p><strong>Jogo:</strong> ${dados.jogo}</p>
          <p><strong>Aba:</strong> ${dados.aba}</p>
          <p><strong>Assunto:</strong> ${dados.assunto}</p>
          <p><strong>Descrição:</strong> ${dados.descricao}</p>
          <p><strong>Status:</strong> ${dados.status}</span></p>
        </div>
      `;
    });

    $("#detalhes").html(html);
  }

  // O que acontece ao clicar no botão (apagar)
  window.apagarSolicitacao = function (index) {
    if (confirm("Deseja apagar esta solicitação?")) {
      const solicitacoes = obterSolicitacoes();
      solicitacoes.splice(index, 1); // Remove apenas a solicitação selecionada
      salvarSolicitacoes(solicitacoes);
      mostrarAcompanhamento();
    }
  };

  // Opção de editar
  window.editarSolicitacao = function (index) {
    const solicitacoes = obterSolicitacoes();
    const dados = solicitacoes[index];
    editandoIndex = index; // Salva as edições

    // Dados necessários para criar a solicitação
    $("#nome").val(dados.nome);
    $("#email").val(dados.email);
    $("#jogo").val(dados.jogo);
    $("#aba").val(dados.aba);
    $("#assunto").val(dados.assunto);
    $("#descricao").val(dados.descricao);

    // Formulário para nova solicitação
    $("#acompanhamento").addClass("d-none");
    $("#btn-nova-solicitacao").addClass("d-none");
    $("#form-suporte").removeClass("d-none");
  };

  // Verificação simples dos e-mails preenchidos
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  $("#form-suporte").on("submit", function (e) {
    e.preventDefault();

    const nome = $("#nome").val().trim();
    const email = $("#email").val().trim();
    const descricao = $("#descricao").val().trim();

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !email || !descricao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarEmail(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    const dados = {
      nome,
      email,
      jogo: $("#jogo").val(),
      aba: $("#aba").val(),
      assunto: $("#assunto").val(),
      descricao,
      status: "Em análise",
    };

    const solicitacoes = obterSolicitacoes();

    // Se editar, substitui as informações antigas
    if (editandoIndex !== null) {
      solicitacoes[editandoIndex] = dados;
      editandoIndex = null;
    } else {
      solicitacoes.push(dados);
    }

    salvarSolicitacoes(solicitacoes);
    $("#form-suporte")[0].reset();
    mostrarAcompanhamento();
  });

  // Ao clicar no botão "Nova solicitação"
  $("#btn-nova-solicitacao").on("click", function () {
    editandoIndex = null;
    $("#form-suporte")[0].reset();
    $("#form-suporte").removeClass("d-none");
    $("#acompanhamento").addClass("d-none");
    $("#btn-nova-solicitacao").addClass("d-none");
  });

  // Quando a página carregar, se já tiver solicitações salvas, exibe direto.
  if (obterSolicitacoes().length > 0) {
    mostrarAcompanhamento();
  }
});
