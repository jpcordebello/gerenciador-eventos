import { useEffect, useState } from 'react'

import '../App.css'

import Header from '../components/Header'
import EventoModal from '../components/EventoModal'
import CalendarioEventos from '../components/CalendarioEventos'

import {
    listarTodosEventos,
} from '../services/eventoService'

const API_URL = 'http://localhost:8080/eventos'

function Home() {
    const [eventos, setEventos] = useState([])
    const [paginaAtual, setPaginaAtual] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalElementos, setTotalElementos] = useState(0)

    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const [eventoSelecionado, setEventoSelecionado] =
        useState(null)

    const [visualizacao, setVisualizacao] =
        useState('cards')

    const [eventosCalendario, setEventosCalendario] =
        useState([])

    const [
        carregandoCalendario,
        setCarregandoCalendario,
    ] = useState(false)

    const [
        calendarioCarregado,
        setCalendarioCarregado,
    ] = useState(false)

    useEffect(() => {
        async function carregarEventos() {
            try {
                setCarregando(true)
                setErro('')

                const resposta = await fetch(
                    `${API_URL}?page=${paginaAtual}&size=12`,
                )

                if (!resposta.ok) {
                    throw new Error(
                        'Não foi possível carregar os eventos.',
                    )
                }

                const dados = await resposta.json()

                setEventos(dados.conteudo)
                setTotalPaginas(dados.totalPaginas)
                setTotalElementos(dados.totalElementos)
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregando(false)
            }
        }

        carregarEventos()
    }, [paginaAtual])

    async function abrirCalendario() {
        setVisualizacao('calendario')

        if (calendarioCarregado) {
            return
        }

        try {
            setCarregandoCalendario(true)
            setErro('')

            const todosEventos =
                await listarTodosEventos()

            setEventosCalendario(todosEventos)
            setCalendarioCarregado(true)
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregandoCalendario(false)
        }
    }

    function formatarData(data) {
        if (!data) return ''

        return new Date(
            `${data}T12:00:00`,
        ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
        })
    }

    function formatarPeriodo(
        dataInicio,
        dataFim,
    ) {
        if (!dataFim) {
            return formatarData(dataInicio)
        }

        return `${formatarData(
            dataInicio,
        )} — ${formatarData(dataFim)}`
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

    function mudarPagina(novaPagina) {
        if (
            novaPagina >= 0 &&
            novaPagina < totalPaginas &&
            novaPagina !== paginaAtual
        ) {
            setPaginaAtual(novaPagina)

            window.scrollTo({
                top: 450,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="app">
            <Header />

            <main>
                <section className="hero">
                    <div className="container hero-conteudo">
                        <span className="hero-etiqueta">
                            Agenda de Petrópolis
                        </span>

                        <h1>
                            Descubra o que está
                            <span>
                                {' '}
                                acontecendo na cidade.
                            </span>
                        </h1>

                        <p>
                            Cultura, gastronomia, esporte e lazer em
                            um só lugar. Encontre os próximos eventos
                            de Petrópolis.
                        </p>

                        <div className="busca">
                            <span className="busca-icone">
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                aria-label="Buscar eventos"
                            />

                            <button type="button">
                                Buscar
                            </button>
                        </div>

                        <div className="categorias">
                            <button
                                className="categoria ativa"
                                type="button"
                            >
                                Todos
                            </button>

                            <button
                                className="categoria"
                                type="button"
                            >
                                Cultural
                            </button>

                            <button
                                className="categoria"
                                type="button"
                            >
                                Esporte
                            </button>

                            <button
                                className="categoria"
                                type="button"
                            >
                                Gastronômico
                            </button>

                            <button
                                className="categoria"
                                type="button"
                            >
                                Lazer
                            </button>
                        </div>
                    </div>
                </section>

                <section
                    className="eventos"
                    id="eventos"
                >
                    <div className="container">
                        <div className="secao-cabecalho">
                            <div>
                                <span className="secao-etiqueta">
                                    AGENDA
                                </span>

                                <h2>
                                    Próximos eventos
                                </h2>
                            </div>

                            <div className="agenda-controles">
                                <p>
                                    {totalElementos} eventos cadastrados
                                </p>

                                <div className="visualizacao-opcoes">
                                    <button
                                        type="button"
                                        className={
                                            visualizacao === 'cards'
                                                ? 'ativa'
                                                : ''
                                        }
                                        onClick={() =>
                                            setVisualizacao('cards')
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="3"
                                                width="7"
                                                height="7"
                                                rx="1"
                                            />
                                            <rect
                                                x="14"
                                                y="3"
                                                width="7"
                                                height="7"
                                                rx="1"
                                            />
                                            <rect
                                                x="3"
                                                y="14"
                                                width="7"
                                                height="7"
                                                rx="1"
                                            />
                                            <rect
                                                x="14"
                                                y="14"
                                                width="7"
                                                height="7"
                                                rx="1"
                                            />
                                        </svg>

                                        Cards
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            visualizacao ===
                                                'calendario'
                                                ? 'ativa'
                                                : ''
                                        }
                                        onClick={abrirCalendario}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="16"
                                                rx="3"
                                            />
                                            <path d="M8 3V7M16 3V7M3 10H21" />
                                        </svg>

                                        Calendário
                                    </button>
                                </div>
                            </div>
                        </div>

                        {erro && (
                            <div className="estado erro">
                                {erro}
                            </div>
                        )}

                        {visualizacao === 'cards' && (
                            <>
                                {carregando && (
                                    <div className="estado">
                                        Carregando eventos...
                                    </div>
                                )}

                                {!carregando &&
                                    !erro &&
                                    eventos.length === 0 && (
                                        <div className="estado">
                                            Nenhum evento encontrado.
                                        </div>
                                    )}

                                {!carregando &&
                                    !erro &&
                                    eventos.length > 0 && (
                                        <div className="grade-eventos">
                                            {eventos.map((evento) => (
                                                <article
                                                    className="card-evento"
                                                    key={evento.id}
                                                >
                                                    <div className="card-imagem">
                                                        <img
                                                            src={evento.imagem}
                                                            alt={evento.nome}
                                                        />

                                                        <span className="card-categoria">
                                                            {formatarCategoria(
                                                                evento.categoria,
                                                            )}
                                                        </span>

                                                        <div className="card-data">
                                                            {formatarData(
                                                                evento.dataInicio,
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="card-conteudo">
                                                        <p className="card-periodo">
                                                            {formatarPeriodo(
                                                                evento.dataInicio,
                                                                evento.dataFim,
                                                            )}
                                                        </p>

                                                        <h3>
                                                            {evento.nome}
                                                        </h3>

                                                        <div className="card-local">
                                                            <span>
                                                                ●
                                                            </span>

                                                            <p>
                                                                {evento.localizacao}

                                                                {evento.endereco && (
                                                                    <small>
                                                                        {
                                                                            evento.endereco
                                                                        }
                                                                    </small>
                                                                )}
                                                            </p>
                                                        </div>

                                                        <button
                                                            className="card-link"
                                                            type="button"
                                                            onClick={() =>
                                                                setEventoSelecionado(
                                                                    evento,
                                                                )
                                                            }
                                                        >
                                                            Ver detalhes

                                                            <span>
                                                                →
                                                            </span>
                                                        </button>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}

                                {!carregando &&
                                    totalPaginas > 1 && (
                                        <div className="paginacao">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    mudarPagina(
                                                        paginaAtual - 1,
                                                    )
                                                }
                                                disabled={
                                                    paginaAtual === 0
                                                }
                                                aria-label="Página anterior"
                                            >
                                                ←
                                            </button>

                                            {Array.from(
                                                {
                                                    length:
                                                        totalPaginas,
                                                },
                                                (_, indice) => (
                                                    <button
                                                        type="button"
                                                        key={indice}
                                                        className={
                                                            paginaAtual ===
                                                                indice
                                                                ? 'ativa'
                                                                : ''
                                                        }
                                                        onClick={() =>
                                                            mudarPagina(
                                                                indice,
                                                            )
                                                        }
                                                    >
                                                        {indice + 1}
                                                    </button>
                                                ),
                                            )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    mudarPagina(
                                                        paginaAtual + 1,
                                                    )
                                                }
                                                disabled={
                                                    paginaAtual ===
                                                    totalPaginas - 1
                                                }
                                                aria-label="Próxima página"
                                            >
                                                →
                                            </button>
                                        </div>
                                    )}
                            </>
                        )}

                        {visualizacao ===
                            'calendario' && (
                                <>
                                    {carregandoCalendario && (
                                        <div className="estado">
                                            Montando calendário...
                                        </div>
                                    )}

                                    {!carregandoCalendario &&
                                        !erro &&
                                        eventosCalendario.length >
                                        0 && (
                                            <CalendarioEventos
                                                eventos={
                                                    eventosCalendario
                                                }
                                                onSelecionarEvento={
                                                    setEventoSelecionado
                                                }
                                            />
                                        )}

                                    {!carregandoCalendario &&
                                        !erro &&
                                        calendarioCarregado &&
                                        eventosCalendario.length ===
                                        0 && (
                                            <div className="estado">
                                                Nenhum evento disponível
                                                no calendário.
                                            </div>
                                        )}
                                </>
                            )}
                    </div>
                </section>
            </main>

            {eventoSelecionado && (
                <EventoModal
                    evento={eventoSelecionado}
                    onFechar={() =>
                        setEventoSelecionado(null)
                    }
                />
            )}
        </div>
    )
}

export default Home