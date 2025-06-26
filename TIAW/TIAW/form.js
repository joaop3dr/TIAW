document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const pontos = parseInt(document.getElementById('pontos').value);

  let rank = '';
  let cor = '';

  if (pontos < 1500) {
    rank = 'Bronze';
    cor = 'secondary';
  } else if (pontos < 2500) {
    rank = 'Prata';
    cor = 'info';
  } else if (pontos < 3500) {
    rank = 'Ouro';
    cor = 'warning';
  } else {
    rank = 'Platina';
    cor = 'success';
  }

  // Mostrar resultado
  document.getElementById('userNome').textContent = nome;
  document.getElementById('userPontos').textContent = pontos;
  
  const badge = document.getElementById('userRank');
  badge.textContent = rank;
  badge.className = `badge bg-${cor} fs-5`;

  document.getElementById('resultado').classList.remove('d-none');
});
