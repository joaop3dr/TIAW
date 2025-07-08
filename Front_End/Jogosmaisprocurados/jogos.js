document.addEventListener("DOMContentLoaded", () => {
  const jogos = [
    { nome: "Valorant", imagem: "../images/valorant.jpg" },
    { nome: "League of Legends", imagem: "../images/lol.jpg" },
    { nome: "CS:GO", imagem: "../images/csgo.jpg" },
    { nome: "FIFA", imagem: "../images/fifa.jpg" }
  ];

  const container = document.getElementById("jogos-container");

  jogos.forEach(jogo => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${jogo.imagem}" class="card-img-top" alt="${jogo.nome}">
        <div class="card-body">
          <h5 class="card-title">${jogo.nome}</h5>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
});