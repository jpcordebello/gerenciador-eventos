import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import {
    estaAutenticado,
    removerToken,
} from '../services/authService'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const [autenticado, setAutenticado] = useState(
        estaAutenticado(),
    )

    useEffect(() => {
        setAutenticado(estaAutenticado())
    }, [location.pathname])

    function handleLogout() {
        removerToken()

        setAutenticado(false)

        navigate('/')
    }

    return (
        <header className="cabecalho">
            <div className="container cabecalho-conteudo">
                <Link
                    className="marca"
                    to="/"
                >
                    <span className="marca-icone">
                        P
                    </span>

                    <span>
                        Petrópolis Eventos
                    </span>
                </Link>

                <nav className="navegacao">
                    <Link to="/#eventos">
                        Eventos
                    </Link>

                    {autenticado ? (
                        <>
                            <Link to="/meus-eventos">
                                Meus eventos
                            </Link>

                            <button
                                className="botao-entrar"
                                type="button"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link
                            className="botao-entrar"
                            to="/login"
                        >
                            Entrar
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header