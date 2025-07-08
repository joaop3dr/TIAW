'use strict'

const loginContainer = document.getElementById('login-container')

const moveOverlay = () => loginContainer.classList.toggle('move')

document.getElementById('open-register').addEventListener('click', moveOverlay)

document.getElementById('open-login').addEventListener('click', moveOverlay)

document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)

document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)

// Função para registrar o usuário
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!nome || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verifica se o usuário já existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('Este email já está cadastrado.');
        return;
    }
    // Adiciona o novo usuário
    users.push({ nome, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso!');
    // Limpa os campos do formulário
    document.getElementById('registerForm').reset();
});


