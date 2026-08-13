const API_URL = process.env.EXPO_PUBLIC_API_URL

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
            dados.mensagem ||
                'Não foi possível realizar o login.',
        )
    }

    return dados
}