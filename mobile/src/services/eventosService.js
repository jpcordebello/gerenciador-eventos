import { obterToken } from './tokenService'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function listarEventosGerais(
    pagina = 0,
    tamanho = 12,
) {
    const resposta = await fetch(
        `${API_URL}/eventos?page=${pagina}&size=${tamanho}`,
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível carregar os eventos.',
        )
    }

    return dados
}

export async function listarTodosEventos() {
    const tamanhoPagina = 50

    let pagina = 0
    let ultimaPagina = false
    let todosEventos = []

    while (!ultimaPagina) {
        const dados = await listarEventosGerais(
            pagina,
            tamanhoPagina,
        )

        todosEventos = [
            ...todosEventos,
            ...(dados.conteudo || []),
        ]

        ultimaPagina = dados.ultimaPagina
        pagina += 1
    }

    return todosEventos
}

export async function listarEventosDoAdministrador(
    administradorId,
) {
    const resposta = await fetch(
        `${API_URL}/eventos/administrador/${administradorId}`,
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível carregar seus eventos.',
        )
    }

    return dados
}

export async function cadastrarEvento(evento) {
    const token = await obterToken()

    if (!token) {
        throw new Error('Usuário não autenticado.')
    }

    const resposta = await fetch(
        `${API_URL}/eventos`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(evento),
        },
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível cadastrar o evento.',
        )
    }

    return dados
}

export async function atualizarEvento(
    eventoId,
    evento,
) {
    const token = await obterToken()

    if (!token) {
        throw new Error('Usuário não autenticado.')
    }

    const resposta = await fetch(
        `${API_URL}/eventos/${eventoId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(evento),
        },
    )

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
                'Não foi possível atualizar o evento.',
        )
    }

    return dados
}

export async function excluirEvento(eventoId) {
    const token = await obterToken()

    if (!token) {
        throw new Error('Usuário não autenticado.')
    }

    const resposta = await fetch(
        `${API_URL}/eventos/${eventoId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    if (!resposta.ok) {
        let mensagem =
            'Não foi possível excluir o evento.'

        try {
            const dados = await resposta.json()

            mensagem =
                dados.mensagem || mensagem
        } catch {
            // resposta sem corpo
        }

        throw new Error(mensagem)
    }
}