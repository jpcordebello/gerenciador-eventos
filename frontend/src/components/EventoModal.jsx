import { useEffect } from 'react'
import '../styles/evento-modal.css'

function EventoModal({ evento, onFechar }) {
    useEffect(() => {
        function fecharComEsc(event) {
            if (event.key === 'Escape') {
                onFechar()
            }
        }

        document.addEventListener('keydown', fecharComEsc)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', fecharComEsc)
            document.body.style.overflow = ''
        }
    }, [onFechar])

    function formatarData(data) {
        if (!data) return ''

        return new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }

    function formatarPeriodo() {
        if (!evento.dataFim) {
            return formatarData(evento.dataInicio)
        }

        return `${formatarData(evento.dataInicio)} — ${formatarData(
            evento.dataFim,
        )}`
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

    function fecharAoClicarFora(event) {
        if (event.target === event.currentTarget) {
            onFechar()
        }
    }

    return (
        <div
            className="modal-overlay"
            onMouseDown={fecharAoClicarFora}
        >
            <section
                className="evento-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="evento-modal-titulo"
            >
                <button
                    className="modal-fechar"
                    type="button"
                    onClick={onFechar}
                    aria-label="Fechar detalhes do evento"
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M6 6L18 18M18 6L6 18" />
                    </svg>
                </button>

                <div className="evento-modal-imagem">
                    <img
                        src={evento.imagem}
                        alt={evento.nome}
                    />
                </div>

                <div className="evento-modal-conteudo">
                    <div className="evento-modal-topo">
                        <span className="evento-modal-label">
                            Detalhes do evento
                        </span>

                        <span className="evento-modal-categoria">
                            {formatarCategoria(evento.categoria)}
                        </span>
                    </div>

                    <h2 id="evento-modal-titulo">
                        {evento.nome}
                    </h2>

                    <div className="evento-modal-detalhes">
                        <div className="evento-modal-informacao">
                            <div className="evento-modal-icone">
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
                            </div>

                            <div>
                                <span className="evento-modal-titulo-info">
                                    Data
                                </span>

                                <strong>
                                    {formatarPeriodo()}
                                </strong>
                            </div>
                        </div>

                        <div className="evento-modal-informacao">
                            <div className="evento-modal-icone">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="
                      M20 10
                      C20 15 12 21 12 21
                      C12 21 4 15 4 10
                      C4 5.6 7.6 3 12 3
                      C16.4 3 20 5.6 20 10Z
                    "
                                    />

                                    <circle
                                        cx="12"
                                        cy="10"
                                        r="2.5"
                                    />
                                </svg>
                            </div>

                            <div>
                                <span className="evento-modal-titulo-info">
                                    Local
                                </span>

                                <strong>
                                    {evento.localizacao}
                                </strong>

                                {evento.endereco && (
                                    <p>
                                        {evento.endereco}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="evento-modal-linha" />

                    <div className="evento-modal-acoes">
                        <button
                            className="evento-modal-botao"
                            type="button"
                            onClick={onFechar}
                        >
                            Voltar aos eventos

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M5 12H19M13 6L19 12L13 18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EventoModal