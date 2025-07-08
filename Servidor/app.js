if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Função para cadastrar usuário
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        id: Date.now(), // Cria um ID único baseado no timestamp
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        created_at: new Date().toISOString()
    };

    // Validação simples
    if (!userData.nome || !userData.email || !userData.password) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Verifica formato do email
    if (!validateEmail(userData.email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    // Verifica se o email já existe
    if (users.some(user => user.email === userData.email)) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Adiciona o novo usuário ao array
    users.push(userData);
    
    // Atualiza o localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Cadastro realizado com sucesso!');
    document.getElementById('registerForm').reset();
    
    // Atualiza o console para debug (pode remover depois)
    console.log('Usuários cadastrados:', JSON.parse(localStorage.getItem('users')));
});

// Função para login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Salva o usuário logado no sessionStorage
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        alert(`Bem-vindo(a), ${user.nome}!`);
        localStorage.setItem('isLoggedIn', 'true');
        // Redireciona para área logada (se tiver)
        window.location.href = '/Front_End/Homepage/index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
});

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Funções para alternar entre login e cadastro (seu código existente)
document.getElementById('open-register').addEventListener('click', function() {
    // Sua lógica para mostrar o formulário de cadastro
});

document.getElementById('open-login').addEventListener('click', function() {
    // Sua lógica para mostrar o formulário de login
});

// Ao carregar a página, verifica se já existe o JSON no localStorage
if (!localStorage.getItem('users')) {
    // Se não existir, cria um array vazio
    localStorage.setItem('users', JSON.stringify([]));
}
