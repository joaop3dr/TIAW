const dados = [
  {
    "titulo": "Iniciando a discussão",
    "autor": "Pedro Amaral",
    "data": "09/05/2025",
    "mensagem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "titulo": "Dúvida sobre horários",
    "autor": "Juliana Costa",
    "data": "08/05/2025",
    "mensagem": "Alguém sabe se os jogos noturnos estão disponíveis durante a semana?"
  },
  {
    "titulo": "Sugestão de novos jogos",
    "autor": "Marcos Lima",
    "data": "07/05/2025",
    "mensagem": "Seria legal adicionar jogos de tabuleiro ao catálogo do Match Found."
  },
  {
    "titulo": "Problema com login",
    "autor": "Aline Rocha",
    "data": "06/05/2025",
    "mensagem": "Não estou conseguindo acessar minha conta. Mais alguém com esse problema?"
  }
];

const topicosContainer = document.getElementById('topicos');
const mensagemSection = document.getElementById('mensagem-section');
const mensagemTexto = document.getElementById('mensagem');
const botaoNovoTopico = document.getElementById('novo-topico');
const formularioSection = document.getElementById('formulario-section');
const formTopico = document.getElementById('form-topico');

function renderTopicos() {
  topicosContainer.innerHTML = '';
  dados.forEach((topico, index) => {
    const div = document.createElement('div');
    div.classList.add('topico');
    div.innerHTML = `
      <div class="col">${topico.titulo}</div>
      <div class="col">${topico.autor}</div>
      <div class="col">${topico.data}</div>
    `;
    div.addEventListener('click', () => {
      mensagemTexto.textContent = topico.mensagem;
      mensagemSection.classList.remove('escondido');
    });
    topicosContainer.appendChild(div);
  });
}

formTopico.addEventListener('submit', (e) => {
  e.preventDefault();
  const novoTopico = {
    titulo: document.getElementById('titulo').value,
    autor: document.getElementById('autor').value,
    data: new Date().toLocaleDateString('pt-BR'),
    mensagem: document.getElementById('mensagem-texto').value
  };
  dados.unshift(novoTopico);
  renderTopicos();
  formTopico.reset();
  formularioSection.classList.add('escondido');
});

botaoNovoTopico.addEventListener('click', () => {
  formularioSection.classList.toggle('escondido');
  mensagemSection.classList.add('escondido');
});

renderTopicos();
