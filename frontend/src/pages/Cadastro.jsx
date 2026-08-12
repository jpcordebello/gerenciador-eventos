import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import Header from '../components/Header'
import { cadastrarAdministrador } from '../services/administradorService'

import '../styles/login.css'

function Cadastro() {
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('')

    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        if (senha !== confirmacaoSenha) {
            setErro('As senhas não coincidem.')
            return
        }

        try {
            setCarregando(true)
            setErro('')

            await cadastrarAdministrador({
                nome,
                email,
                senha,
            })

            navigate('/login', {
                state: {
                    mensagem:
                        'Cadastro realizado com sucesso. Agora você já pode entrar.',
                },
            })
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="login-pagina">
            <Header />

            <main className="login-main">
                <section className="login-apresentacao">
                    <div className="login-apresentacao-conteudo">
                        <div className="login-marca-ilustracao">
                            <span>P</span>
                        </div>

                        <span className="login-eyebrow">
                            Petrópolis Eventos
                        </span>

                        <h1>
                            Faça parte
                            <br />
                            da agenda.
                        </h1>

                        <p>
                            Crie sua conta para cadastrar e gerenciar
                            eventos publicados na plataforma.
                        </p>

                        <div className="login-detalhe">
                            <span />
                            Conecte pessoas e eventos
                        </div>
                    </div>
                </section>

                <section className="login-area">
                    <div className="login-card">
                        <div className="login-card-topo">
                            <span className="login-card-tag">
                                Nova conta
                            </span>

                            <h2>Cadastre-se</h2>

                            <p>
                                Preencha seus dados para criar sua conta
                                de administrador.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="login-campo">
                                <label htmlFor="nome">
                                    Nome
                                </label>

                                <div className="login-input">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            cx="12"
                                            cy="8"
                                            r="4"
                                        />

                                        <path d="M4 21C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 21" />
                                    </svg>

                                    <input
                                        id="nome"
                                        type="text"
                                        placeholder="Seu nome"
                                        value={nome}
                                        onChange={(event) =>
                                            setNome(event.target.value)
                                        }
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-campo">
                                <label htmlFor="email">
                                    E-mail
                                </label>

                                <div className="login-input">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="3"
                                        />

                                        <path d="M4 7L12 13L20 7" />
                                    </svg>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="seuemail@exemplo.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-campo">
                                <label htmlFor="senha">
                                    Senha
                                </label>

                                <div className="login-input">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            x="5"
                                            y="10"
                                            width="14"
                                            height="11"
                                            rx="3"
                                        />

                                        <path d="M8 10V7A4 4 0 0116 7V10" />
                                    </svg>

                                    <input
                                        id="senha"
                                        type="password"
                                        placeholder="Crie uma senha"
                                        value={senha}
                                        onChange={(event) =>
                                            setSenha(event.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-campo">
                                <label htmlFor="confirmacaoSenha">
                                    Confirmar senha
                                </label>

                                <div className="login-input">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            x="5"
                                            y="10"
                                            width="14"
                                            height="11"
                                            rx="3"
                                        />

                                        <path d="M8 10V7A4 4 0 0116 7V10" />
                                    </svg>

                                    <input
                                        id="confirmacaoSenha"
                                        type="password"
                                        placeholder="Digite a senha novamente"
                                        value={confirmacaoSenha}
                                        onChange={(event) =>
                                            setConfirmacaoSenha(event.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                    />
                                </div>
                            </div>

                            <p className="cadastro-senha-ajuda">
                                Use pelo menos 8 caracteres, incluindo
                                letra maiúscula e caractere especial.
                            </p>

                            {erro && (
                                <div
                                    className="login-erro"
                                    role="alert"
                                >
                                    {erro}
                                </div>
                            )}

                            <button
                                className="login-botao"
                                type="submit"
                                disabled={carregando}
                            >
                                {carregando
                                    ? 'Cadastrando...'
                                    : 'Criar conta'}

                                {!carregando && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12H19M13 6L19 12L13 18" />
                                    </svg>
                                )}
                            </button>
                        </form>

                        <div className="login-cadastro">
                            <span>
                                Já possui uma conta?
                            </span>

                            <Link to="/login">
                                Entrar
                            </Link>
                        </div>

                        <Link
                            className="login-voltar"
                            to="/"
                        >
                            ← Voltar para os eventos
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Cadastro