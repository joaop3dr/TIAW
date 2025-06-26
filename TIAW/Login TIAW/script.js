document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // Verifica se existem dados salvos no localStorage
  const savedUser = localStorage.getItem("usuario") || "gamer";
  const savedPass = localStorage.getItem("senha") || "123456";

  if (username === savedUser && password === savedPass) {
    window.location.href = "Homepage/index.html";
  } else {
    errorMsg.textContent = "Usuário ou senha incorretos.";
  }
});

