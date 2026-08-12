import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import Header from '../components/Header'
import EventoFormModal from '../components/EventoFormModal'
import ConfirmacaoModal from '../components/ConfirmacaoModal'

import {
    buscarAdministradorAutenticado,
} from '../services/administradorService'

import {
    atualizarEvento,
    cadastrarEvento,
    excluirEvento,
    listarEventosDoAdministrador,
} from '../services/eventoService'

import {
    estaAutenticado,
    removerToken,
} from '../services/authService'

import '../styles/meus-eventos.css'

function MeusEventos() {
    const navigate = useNavigate()

    const [administrador, setAdministrador] = useState(null)
    const [eventos, setEventos] = useState([])

    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const [modalNovoAberto, setModalNovoAberto] =
        useState(false)

    const [eventoEmEdicao, setEventoEmEdicao] =
        useState(null)

    const [eventoParaExcluir, setEventoParaExcluir] =
        useState(null)

    const [excluindo, setExcluindo] =
        useState(false)

    useEffect(() => {
        async function carregarDados() {
            if (!estaAutenticado()) {
                navigate('/login', { replace: true })
                return
            }

            try {
                setCarregando(true)
                setErro('')

                const dadosAdministrador =
                    await buscarAdministradorAutenticado()

                const dadosEventos =
                    await listarEventosDoAdministrador(
                        dadosAdministrador.id,
                    )

                setAdministrador(dadosAdministrador)
                setEventos(dadosEventos)
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [navigate])

    async function recarregarEventos() {
        if (!administrador) return

        const dados =
            await listarEventosDoAdministrador(
                administrador.id,
            )

        setEventos(dados)
    }

    async function salvarNovoEvento(dadosEvento) {
        if (!administrador) return

        await cadastrarEvento({
            ...dadosEvento,
            adminId: administrador.id,
        })

        await recarregarEventos()

        setModalNovoAberto(false)
        setMensagem('Evento cadastrado com sucesso.')
    }

    async function salvarEdicao(dadosEvento) {
        if (!eventoEmEdicao) return

        await atualizarEvento(
            eventoEmEdicao.id,
            {
                dataInicio: dadosEvento.dataInicio,
                dataFim: dadosEvento.dataFim,
                localizacao: dadosEvento.localizacao,
                endereco: dadosEvento.endereco,
                categoria: dadosEvento.categoria,
            },
        )

        await recarregarEventos()

        setEventoEmEdicao(null)
        setMensagem('Evento atualizado com sucesso.')
    }

    async function confirmarExclusao() {
        if (!eventoParaExcluir) return

        try {
            setExcluindo(true)
            setErro('')

            await excluirEvento(
                eventoParaExcluir.id,
            )

            await recarregarEventos()

            setEventoParaExcluir(null)
            setMensagem('Evento excluído com sucesso.')
        } catch (error) {
            setErro(error.message)
            setEventoParaExcluir(null)
        } finally {
            setExcluindo(false)
        }
    }

    function formatarData(data) {
        if (!data) return ''

        return new Date(`${data}T12:00:00`)
            .toLocaleDateString(
                'pt-BR',
                {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                },
            )
    }

    function formatarCategoria(categoria) {
        const categorias = {
            CULTURAL: 'Cultural',
            ESPORTE: 'Esporte',
            GASTRONOMICO: 'Gastronômico',
            LAZER: 'Lazer',
        }

        return categorias[categoria] ?? categoria
    }

    function sair() {
        removerToken()
        navigate('/login')
    }

    return (
        <div className="meus-eventos-pagina">
            <Header />

            <main className="meus-eventos-main">
                <div className="container">
                    <section className="painel-topo">
                        <div>
                            <span className="painel-etiqueta">
                                Painel do administrador
                            </span>

                            <h1>Meus Eventos</h1>

                            <p>
                                {administrador
                                    ? `Olá, ${administrador.nome}. Gerencie seus eventos por aqui.`
                                    : 'Gerencie seus eventos por aqui.'}
                            </p>
                        </div>

                        <div className="painel-acoes">
                            <Link
                                className="painel-voltar"
                                to="/"
                            >
                                Ver agenda
                            </Link>

                            <button
                                className="painel-sair"
                                type="button"
                                onClick={sair}
                            >
                                Sair
                            </button>

                            <button
                                className="painel-novo"
                                type="button"
                                onClick={() => {
                                    setMensagem('')
                                    setModalNovoAberto(true)
                                }}
                            >
                                <span>+</span>
                                Novo evento
                            </button>
                        </div>
                    </section>

                    {mensagem && (
                        <div className="painel-sucesso">
                            {mensagem}
                        </div>
                    )}

                    <section className="painel-resumo">
                        <div className="resumo-card">
                            <span>
                                Eventos cadastrados
                            </span>

                            <strong>
                                {eventos.length}
                            </strong>
                        </div>

                        <div className="resumo-card">
                            <span>Administrador</span>

                            <strong className="resumo-nome">
                                {administrador?.nome || '—'}
                            </strong>
                        </div>
                    </section>

                    {carregando && (
                        <div className="painel-estado">
                            Carregando seus eventos...
                        </div>
                    )}

                    {erro && (
                        <div className="painel-estado painel-erro">
                            {erro}
                        </div>
                    )}

                    {!carregando &&
                        !erro &&
                        eventos.length === 0 && (
                            <div className="painel-vazio">
                                <div className="painel-vazio-icone">
                                    +
                                </div>

                                <h2>
                                    Nenhum evento cadastrado
                                </h2>

                                <p>
                                    Cadastre seu primeiro evento para que
                                    ele apareça na agenda.
                                </p>
                            </div>
                        )}

                    {!carregando &&
                        eventos.length > 0 && (
                            <section className="meus-eventos-lista">
                                {eventos.map((evento) => (
                                    <article
                                        className="meu-evento-card"
                                        key={evento.id}
                                    >
                                        <div className="meu-evento-imagem">
                                            <img
                                                src={evento.imagem}
                                                alt={evento.nome}
                                            />
                                        </div>

                                        <div className="meu-evento-conteudo">
                                            <div className="meu-evento-cabecalho">
                                                <span className="meu-evento-categoria">
                                                    {formatarCategoria(
                                                        evento.categoria,
                                                    )}
                                                </span>

                                                <span className="meu-evento-id">
                                                    #{evento.id}
                                                </span>
                                            </div>

                                            <h2>
                                                {evento.nome}
                                            </h2>

                                            <div className="meu-evento-info">
                                                <span>
                                                    {formatarData(
                                                        evento.dataInicio,
                                                    )}

                                                    {evento.dataFim &&
                                                        ` — ${formatarData(
                                                            evento.dataFim,
                                                        )}`}
                                                </span>

                                                <span>
                                                    {evento.localizacao}
                                                </span>
                                            </div>

                                            {evento.endereco && (
                                                <p className="meu-evento-endereco">
                                                    {evento.endereco}
                                                </p>
                                            )}

                                            <div className="meu-evento-acoes">
                                                <button
                                                    className="acao-editar"
                                                    type="button"
                                                    onClick={() => {
                                                        setMensagem('')
                                                        setEventoEmEdicao(
                                                            evento,
                                                        )
                                                    }}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="acao-excluir"
                                                    type="button"
                                                    onClick={() => {
                                                        setMensagem('')
                                                        setEventoParaExcluir(
                                                            evento,
                                                        )
                                                    }}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </section>
                        )}
                </div>
            </main>

            {modalNovoAberto && (
                <EventoFormModal
                    titulo="Novo evento"
                    onFechar={() =>
                        setModalNovoAberto(false)
                    }
                    onSalvar={salvarNovoEvento}
                />
            )}

            {eventoEmEdicao && (
                <EventoFormModal
                    titulo="Editar evento"
                    eventoInicial={eventoEmEdicao}
                    onFechar={() =>
                        setEventoEmEdicao(null)
                    }
                    onSalvar={salvarEdicao}
                />
            )}

            {eventoParaExcluir && (
                <ConfirmacaoModal
                    evento={eventoParaExcluir}
                    excluindo={excluindo}
                    onCancelar={() =>
                        setEventoParaExcluir(null)
                    }
                    onConfirmar={confirmarExclusao}
                />
            )}
        </div>
    )
}

export default MeusEventos