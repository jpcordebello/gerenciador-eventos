import { obterToken } from './authService'

const API_URL = 'http://localhost:8080'

export async function listarEventosDoAdministrador(adminId) {
    const resposta = await fetch(
        `${API_URL}/eventos/administrador/${adminId}`,
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
    const token = obterToken()

    const resposta = await fetch(`${API_URL}/eventos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(evento),
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem ||
            'Não foi possível cadastrar o evento.',
        )
    }

    return dados
}

export async function atualizarEvento(eventoId, evento) {
    const token = obterToken()

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
    const token = obterToken()

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
        const dados = await resposta.json()

        throw new Error(
            dados.mensagem ||
            'Não foi possível excluir o evento.',
        )
    }
}

export async function listarTodosEventos() {
    const tamanhoPagina = 50
    let pagina = 0
    let ultimaPagina = false
    let todosEventos = []

    while (!ultimaPagina) {
        const resposta = await fetch(
            `${API_URL}/eventos?page=${pagina}&size=${tamanhoPagina}`,
        )

        const dados = await resposta.json()

        if (!resposta.ok) {
            throw new Error(
                dados.mensagem ||
                'Não foi possível carregar os eventos.',
            )
        }

        todosEventos = [
            ...todosEventos,
            ...dados.conteudo,
        ]

        ultimaPagina = dados.ultimaPagina
        pagina += 1
    }

    return todosEventos
}