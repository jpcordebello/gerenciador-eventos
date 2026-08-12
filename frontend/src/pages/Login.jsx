import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import Header from '../components/Header'
import { login, salvarToken } from '../services/authService'

import '../styles/login.css'

function Login() {
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [gravarSenha, setGravarSenha] = useState(false)

    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    useEffect(() => {
        const emailSalvo = localStorage.getItem('emailLembrado')

        if (emailSalvo) {
            setEmail(emailSalvo)
            setGravarSenha(true)
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setCarregando(true)
            setErro('')

            const dados = await login(email, senha)

            salvarToken(dados.token)

            if (gravarSenha) {
                localStorage.setItem('emailLembrado', email)
            } else {
                localStorage.removeItem('emailLembrado')
            }

            navigate('/meus-eventos')
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
                            Sua cidade.
                            <br />
                            Seus eventos.
                        </h1>

                        <p>
                            Acesse sua conta para cadastrar e gerenciar
                            os eventos publicados na plataforma.
                        </p>

                        <div className="login-detalhe">
                            <span />
                            Descubra Petrópolis
                        </div>
                    </div>
                </section>

                <section className="login-area">
                    <div className="login-card">
                        <div className="login-card-topo">
                            <span className="login-card-tag">
                                Bem-vindo
                            </span>

                            <h2>Entrar</h2>

                            <p>
                                Informe seus dados para acessar sua conta.
                            </p>
                        </div>

                        {location.state?.mensagem && (
                            <div className="login-sucesso">
                                {location.state.mensagem}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            autoComplete="on"
                        >
                            <div className="login-campo">
                                <label htmlFor="username">
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
                                        id="username"
                                        name="username"
                                        type="email"
                                        placeholder="seuemail@exemplo.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-campo">
                                <label htmlFor="current-password">
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
                                        id="current-password"
                                        name="password"
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={senha}
                                        onChange={(event) =>
                                            setSenha(event.target.value)
                                        }
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>
                            </div>

                            <label className="login-lembrar">
                                <input
                                    type="checkbox"
                                    checked={gravarSenha}
                                    onChange={(event) =>
                                        setGravarSenha(
                                            event.target.checked,
                                        )
                                    }
                                />

                                <span className="login-checkbox">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12L10 17L19 7" />
                                    </svg>
                                </span>

                                Gravar senha
                            </label>

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
                                    ? 'Entrando...'
                                    : 'Entrar'}

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
                                Ainda não possui uma conta?
                            </span>

                            <Link to="/cadastro">
                                Cadastre-se
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

export default Login