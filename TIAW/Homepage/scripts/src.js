const loginRegister = document.getElementById('login')

const moveLogin = () => loginRegister.classList.add('sumir')

document.getElementById('sumir').addEventListener('click', moveLogin)

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const loginLinkContainer = document.getElementById('login');
    const loginLink = document.getElementById('sumir'); // O 'a' dentro da div 'login'

    // Função para esconder o botão de login
    const hideLoginButton = () => {
        if (loginLinkContainer) {
            loginLinkContainer.classList.add('sumir');
        }
    };

    // Função para mostrar o botão de login (útil para logout ou testes)
    const showLoginButton = () => {
        if (loginLinkContainer) {
            loginLinkContainer.classList.remove('sumir');
        }
    };

    // --- Lógica para persistir o estado de login ---

    // 1. Ao carregar a página, verifica se há um indicador de login no localStorage
    if (localStorage.getItem('isLoggedIn') === 'true') {
        hideLoginButton();
    } else {
        showLoginButton(); // Garante que o botão apareça se não estiver logado
    }

    // 2. Quando o botão "Login/Cadastro" é clicado:
    if (loginLink) {
        loginLink.addEventListener('click', (event) => {
            // Não chame preventDefault aqui, pois você quer que ele navegue para a página de login
            // event.preventDefault(); // Remova esta linha se estiver presente

            // Oculta o botão imediatamente (opcional, mas dá um feedback visual)
            hideLoginButton();

            // Você navegará para a página de login.
            // O estado 'isLoggedIn' será definido na página de login após o sucesso.
        });
    }

    // Exemplo de como você poderia ter um botão de "logout" que resetaria o estado
    // Se você tiver um botão de logout em alguma parte da sua página:
    // const logoutButton = document.getElementById('logout-button');
    // if (logoutButton) {
    //     logoutButton.addEventListener('click', () => {
    //         localStorage.removeItem('isLoggedIn'); // Remove o estado de login
    //         showLoginButton(); // Mostra o botão de login novamente
    //         // Redirecionar para a home ou página de login, se necessário
    //         // window.location.href = '/TIAW/home/index.html';
    //     });
    // }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginLinkContainer = document.getElementById('login'); // Div do botão Login/Cadastro
    const loginLink = document.getElementById('sumir'); // O link 'Login/Cadastro'
    const profileArea = document.getElementById('profileArea'); // Nova div da área de perfil
    const profileIcon = document.querySelector('.profile-icon'); // Ícone do perfil
    const profileDropdown = document.getElementById('profileDropdown'); // Menu suspenso do perfil
    const logoutButton = document.getElementById('logoutButton'); // Botão de Sair no dropdown
    const userNameDisplay = document.getElementById('userNameDisplay'); // Span para mostrar o nome

    // Função para esconder o botão de login
    const hideLoginButton = () => {
        if (loginLinkContainer) {
            loginLinkContainer.classList.add('sumir');
        }
    };

    // Função para mostrar o botão de login
    const showLoginButton = () => {
        if (loginLinkContainer) {
            loginLinkContainer.classList.remove('sumir');
        }
    };

    // Função para esconder a área do perfil
    const hideProfileArea = () => {
        if (profileArea) {
            profileArea.classList.remove('visible');
            profileDropdown.classList.remove('show'); // Esconde o dropdown também
        }
    };

    // Função para mostrar a área do perfil
    const showProfileArea = () => {
        if (profileArea) {
            profileArea.classList.add('visible');
        }
    };

    // --- Lógica de Inicialização (ao carregar a página) ---
    // Verifica se há um indicador de login no localStorage
    if (localStorage.getItem('isLoggedIn') === 'true') {
        hideLoginButton(); // Esconde o botão de Login/Cadastro
        showProfileArea(); // Mostra a área do perfil

        // Tenta obter o nome do usuário logado do sessionStorage
        const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
        if (loggedUser && loggedUser.nome) {
            userNameDisplay.textContent = `Olá, ${loggedUser.nome.split(' ')[0]}!`; // Mostra só o primeiro nome
        } else {
            userNameDisplay.textContent = `Olá, Usuário!`;
        }

    } else {
        showLoginButton(); // Garante que o botão apareça se não estiver logado
        hideProfileArea(); // Garante que a área do perfil esteja oculta
    }

    // --- Event Listeners ---

    // 1. Ao clicar no botão "Login/Cadastro" (se visível):
    if (loginLink) {
        loginLink.addEventListener('click', () => {
            // Quando ele é clicado, já oculta ele. A navegação acontece normalmente.
            hideLoginButton();
        });
    }

    // 2. Ao clicar no ícone do perfil:
    if (profileIcon) {
        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique se propague para o document
            profileDropdown.classList.toggle('show'); // Alterna a visibilidade do dropdown
        });
    }

    // 3. Ao clicar fora do dropdown, ele deve ser fechado:
    document.addEventListener('click', (event) => {
        if (profileDropdown && !profileArea.contains(event.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // 4. Ao clicar no botão "Sair" (Logout):
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a ação padrão do link (navegação)

            localStorage.removeItem('isLoggedIn'); // Remove o estado de login do localStorage
            sessionStorage.removeItem('loggedUser'); // Remove os dados do usuário da sessão

            alert('Você foi desconectado.'); // Feedback para o usuário

            // Esconde a área do perfil e mostra o botão de login novamente
            hideProfileArea();
            showLoginButton();

            // Opcional: Redirecionar para a página de login ou recarregar a página
            window.location.href = '/TIAW/login-cadastro/index.html'; // Redireciona para a página de login
            // Ou: window.location.reload(); // Recarrega a página atual
        });
    }
});
