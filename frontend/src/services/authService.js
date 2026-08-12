const API_URL = 'http://localhost:8080'

export async function login(email, senha) {
    const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            senha,
        }),
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || 'Não foi possível realizar o login.',
        )
    }

    return dados
}

export function salvarToken(token) {
    localStorage.setItem('token', token)
}

export function obterToken() {
    return localStorage.getItem('token')
}

export function removerToken() {
    localStorage.removeItem('token')
}

export function estaAutenticado() {
    return Boolean(obterToken())
}