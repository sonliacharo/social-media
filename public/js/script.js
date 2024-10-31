document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os manipuladores de eventos
    initRegisterForm();
    initLoginForm();
    initPostForm();
});

// Função para tratar o registro
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearMessage(messageDiv);
            const nome = document.getElementById('registerName').value;
            const senha = document.getElementById('registerPassword').value;

            const data = await sendRequest('/usuario/register', { nome, senha });
            handleRegisterResponse(data, messageDiv);
        });
    }
}

// Função para tratar o login
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearMessage(messageDiv);
            const nome = document.getElementById('loginName').value;
            const senha = document.getElementById('loginPassword').value;

            const data = await sendRequest('/usuario/login', { nome, senha });
            handleLoginResponse(data, messageDiv);
        });
    }
}

function initPostForm() {
    const postForm = document.getElementById('postForm');
    
    if (postForm) {
        postForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const conteudo = document.getElementById('postContent').value;
            const imagemInput = document.getElementById('postImage');
            const imagem = imagemInput.files[0] ? imagemInput.files[0].name : null;
            
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Usuário não autenticado!');
                return;
            }

            const data = { conteudo, imagem };
            const response = await sendAuthenticatedRequest('/postagem/post', data, token);

            if (response.error) {
                alert(response.error);
            } else {
                alert(response.message);
                postForm.reset();
            }
        });
    }
}

// Função para enviar a requisição
async function sendRequest(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('Status da resposta:', response.status);

        const data = await response.json();

        console.log('Dados recebidos:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Erro desconhecido.');
        }
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

async function sendAuthenticatedRequest(url, body, token) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Envia o token JWT no header
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Erro desconhecido.');
        }
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

// Função para lidar com a resposta
function handleRegisterResponse(data, messageDiv) {

    console.log('Dados da resposta do login:', data);

    if (data.error) {
        messageDiv.textContent = data.error;
    } else {
        console.log('Token JWT recebido:', data.token);
        messageDiv.textContent = data.message;
        
        if (data.message === 'Usuário registrado com sucesso.') {
            setTimeout(() => {
                window.location.href = '/confirmation'; // Redireciona para confirmation.html
            }, 2000); // Delay de 2 segundos
        }
    }
}

function handleLoginResponse(data, messageDiv) {
    console.log('Função handleLogin chamada');

    console.log('Resposta do servidor:', data);

    if (data.error) {
        messageDiv.textContent = data.error;
    } else {
        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', data.token);
        
        // Exibir mensagem de sucesso
        messageDiv.textContent = data.message;

        if (data.message === 'Login bem-sucedido!') {
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redireciona para dashboard.html
            }, 2000); // Delay de 2 segundos
        }
    }
}

// Função para limpar a mensagem anterior
function clearMessage(messageDiv) {
    messageDiv.textContent = '';
}
