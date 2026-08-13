import { obterToken } from './tokenService'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function cadastrarAdministrador(administrador) {
    const resposta = await fetch(
        `${API_URL}/administradores`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(administrador),
        },
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível realizar o cadastro.',
        )
    }

    return dados
}

export async function buscarAdministradorLogado() {
    const token = await obterToken()

    if (!token) {
        throw new Error(
            'Usuário não autenticado.',
        )
    }

    const resposta = await fetch(
        `${API_URL}/administradores/me`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível carregar o administrador.',
        )
    }

    return dados
}