document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-amigo");
  const lista = document.getElementById("lista-amigos");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = nome;
    lista.appendChild(item);
    form.reset();
  });
});
