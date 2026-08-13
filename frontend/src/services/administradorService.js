import { obterToken } from './authService'

const API_URL = import.meta.env.VITE_API_URL

export async function cadastrarAdministrador(dados) {
    const resposta = await fetch(`${API_URL}/administradores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })

    const respostaDados = await resposta.json()

    if (!resposta.ok) {
        if (respostaDados.campos?.length) {
            throw new Error(
                respostaDados.campos
                    .map((campo) => campo.mensagem)
                    .join(' '),
            )
        }

        throw new Error(
            respostaDados.mensagem ||
            'Não foi possível realizar o cadastro.',
        )
    }

    return respostaDados
}

export async function buscarAdministradorAutenticado() {
    const token = obterToken()

    const resposta = await fetch(`${API_URL}/administradores/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
            'Não foi possível carregar os dados do administrador.',
        )
    }

    return dados
}