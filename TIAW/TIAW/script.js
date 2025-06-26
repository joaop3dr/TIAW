// Evento de clique no botão "Descubra seu Ranking"
document.getElementById('descubraRankingBtn').addEventListener('click', function() {
  // Esconde a tela inicial
  document.getElementById('inicio').style.display = 'none';
  
  // Exibe o formulário
  document.getElementById('formulario').style.display = 'block';
});

// 🧾 Evento do formulário
const form = document.getElementById('form');
const rankingDivTop = document.getElementById('rankingTop');
const rankingDivBottom = document.getElementById('rankingBottom');
const temaSelect = document.getElementById('tema');
const body = document.getElementById('body');
const filtroJogo = document.getElementById('jogo');

// 🏆 Medalhas
const medalhas = ['🥇', '🥈', '🥉'];

function calcularRank(pontos) {
  if (pontos < 1000) return { rank: 'Cobre', cor: 'danger' };
  if (pontos < 1500) return { rank: 'Bronze', cor: 'secondary' };
  if (pontos < 2500) return { rank: 'Prata', cor: 'info' };
  if (pontos < 3500) return { rank: 'Ouro', cor: 'warning' };
  if (pontos < 4500) return { rank: 'Platina', cor: 'success' };
  return { rank: 'Diamante', cor: 'primary' };
}

function salvarUsuario(nome, pontos, jogo) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.push({ nome, pontos, jogo });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function exibirRanking(jogoSelecionado) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const filtrados = usuarios.filter(u => u.jogo === jogoSelecionado);
  filtrados.sort((a, b) => b.pontos - a.pontos);

  // Limpar os rankings existentes antes de adicionar novos
  rankingDivTop.innerHTML = ''; // Limpa o conteúdo do ranking superior
  rankingDivBottom.innerHTML = ''; // Limpa o conteúdo do ranking inferior

  // Exibindo no ranking superior
  rankingDivTop.innerHTML = '<ul class="list-group w-100">';
  filtrados.forEach((usuario, i) => {
    const { rank, cor } = calcularRank(usuario.pontos);
    const medalha = medalhas[i] || '';
    const item = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${medalha} ${usuario.nome}</strong><br>
          <small>Pontos: ${usuario.pontos}</small>
        </div>
        <span class="badge bg-${cor} rounded-pill">${rank}</span>
      </li>
    `;
    rankingDivTop.innerHTML += item;
  });
  rankingDivTop.innerHTML += '</ul>';

}

// 🧾 Evento do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const pontos = parseInt(document.getElementById('pontos').value);
  const jogo = document.getElementById('jogo').value;

  if (!nome || isNaN(pontos) || !jogo) return;

  salvarUsuario(nome, pontos, jogo);
  form.reset();

  // Atualizar a exibição do ranking para o jogo selecionado
  exibirRanking(jogo);
});

// 🎮 Troca de ranking por jogo
filtroJogo.addEventListener('change', () => {
  const jogo = filtroJogo.value;
  exibirRanking(jogo);
});

// 🎨 Troca de tema
temaSelect.addEventListener('change', () => {
  const tema = temaSelect.value;
  if (tema === 'dark') {
    body.classList.add('theme-dark');
    body.classList.remove('bg-light');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('bg-light');
  }
});

// ⏱ Inicialização
window.addEventListener('load', () => {
  exibirRanking('Valorant'); // Inicializa com o ranking de Valorant
});

// 🧹 Limpar todos os cadastros
document.getElementById('limparCadastrosBtn').addEventListener('click', function() {
  localStorage.removeItem('usuarios'); // Limpa todos os dados no localStorage
  exibirRanking('Valorant'); // Atualiza a exibição para mostrar que não há dados
});

fetch('usuarios.json')
  .then(res => res.json())
  .then(dados => {
    localStorage.setItem('usuarios', JSON.stringify(dados)); // salva no localStorage
    exibirRanking('Valorant'); // ou outro jogo padrão
  })
  .catch(erro => console.error('Erro ao carregar JSON:', erro));
