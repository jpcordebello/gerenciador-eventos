import { useEffect, useState } from 'react'

import '../styles/evento-form-modal.css'

function EventoFormModal({
    titulo = 'Novo evento',
    eventoInicial = null,
    onFechar,
    onSalvar,
}) {
    const editando = Boolean(eventoInicial)

    const [nome, setNome] = useState(eventoInicial?.nome || '')
    const [dataInicio, setDataInicio] = useState(
        eventoInicial?.dataInicio || '',
    )
    const [dataFim, setDataFim] = useState(
        eventoInicial?.dataFim || '',
    )
    const [localizacao, setLocalizacao] = useState(
        eventoInicial?.localizacao || '',
    )
    const [endereco, setEndereco] = useState(
        eventoInicial?.endereco || '',
    )
    const [imagem, setImagem] = useState(
        eventoInicial?.imagem || '',
    )
    const [categoria, setCategoria] = useState(
        eventoInicial?.categoria || '',
    )

    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')

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

    async function handleSubmit(event) {
        event.preventDefault()

        if (dataFim && dataFim < dataInicio) {
            setErro(
                'A data final não pode ser anterior à data inicial.',
            )
            return
        }

        try {
            setSalvando(true)
            setErro('')

            await onSalvar({
                nome,
                dataInicio,
                dataFim: dataFim || null,
                localizacao,
                endereco: endereco || null,
                imagem:
                    imagem ||
                    'https://placehold.co/600x400?text=Petr%C3%B3polis+Eventos',
                categoria,
            })
        } catch (error) {
            setErro(error.message)
        } finally {
            setSalvando(false)
        }
    }

    function fecharAoClicarFora(event) {
        if (event.target === event.currentTarget) {
            onFechar()
        }
    }

    return (
        <div
            className="form-modal-overlay"
            onMouseDown={fecharAoClicarFora}
        >
            <section
                className="form-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="form-modal-titulo"
            >
                <button
                    className="form-modal-fechar"
                    type="button"
                    onClick={onFechar}
                    aria-label="Fechar formulário"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M6 6L18 18M18 6L6 18" />
                    </svg>
                </button>

                <div className="form-modal-cabecalho">
                    <span className="form-modal-tag">
                        Gerenciar evento
                    </span>

                    <h2 id="form-modal-titulo">
                        {titulo}
                    </h2>

                    <p>
                        {editando
                            ? 'Atualize as informações do evento.'
                            : 'Preencha as informações que serão exibidas na agenda de Petrópolis.'}
                    </p>
                </div>

                <form
                    className="evento-form"
                    onSubmit={handleSubmit}
                >
                    <div className="evento-form-campo">
                        <label htmlFor="nomeEvento">
                            Nome do evento
                            {editando && <span> (não editável)</span>}
                        </label>

                        <input
                            id="nomeEvento"
                            type="text"
                            placeholder="Ex.: Festival de Inverno"
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                            disabled={editando}
                            required
                        />
                    </div>

                    <div className="evento-form-grid">
                        <div className="evento-form-campo">
                            <label htmlFor="dataInicio">
                                Data inicial
                            </label>

                            <input
                                id="dataInicio"
                                type="date"
                                value={dataInicio}
                                onChange={(event) =>
                                    setDataInicio(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="evento-form-campo">
                            <label htmlFor="dataFim">
                                Data final
                            </label>

                            <input
                                id="dataFim"
                                type="date"
                                value={dataFim}
                                onChange={(event) =>
                                    setDataFim(event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="evento-form-grid">
                        <div className="evento-form-campo">
                            <label htmlFor="localizacao">
                                Local
                            </label>

                            <input
                                id="localizacao"
                                type="text"
                                placeholder="Ex.: Palácio de Cristal"
                                value={localizacao}
                                onChange={(event) =>
                                    setLocalizacao(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="evento-form-campo">
                            <label htmlFor="categoria">
                                Categoria
                            </label>

                            <select
                                id="categoria"
                                value={categoria}
                                onChange={(event) =>
                                    setCategoria(event.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Selecione
                                </option>

                                <option value="CULTURAL">
                                    Cultural
                                </option>

                                <option value="ESPORTE">
                                    Esporte
                                </option>

                                <option value="GASTRONOMICO">
                                    Gastronômico
                                </option>

                                <option value="LAZER">
                                    Lazer
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="evento-form-campo">
                        <label htmlFor="endereco">
                            Endereço
                        </label>

                        <input
                            id="endereco"
                            type="text"
                            placeholder="Rua, número e complemento"
                            value={endereco}
                            onChange={(event) =>
                                setEndereco(event.target.value)
                            }
                        />
                    </div>

                    <div className="evento-form-campo">
                        <label htmlFor="imagem">
                            Imagem do evento
                            <span>
                                {editando
                                    ? ' (não editável)'
                                    : ' (opcional)'}
                            </span>
                        </label>

                        <input
                            id="imagem"
                            type="url"
                            placeholder="Opcional por enquanto"
                            value={imagem}
                            onChange={(event) =>
                                setImagem(event.target.value)
                            }
                            disabled={editando}
                        />
                    </div>

                    {erro && (
                        <div
                            className="evento-form-erro"
                            role="alert"
                        >
                            {erro}
                        </div>
                    )}

                    <div className="evento-form-acoes">
                        <button
                            className="evento-form-cancelar"
                            type="button"
                            onClick={onFechar}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>

                        <button
                            className="evento-form-salvar"
                            type="submit"
                            disabled={salvando}
                        >
                            {salvando
                                ? 'Salvando...'
                                : editando
                                    ? 'Salvar alterações'
                                    : 'Salvar evento'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default EventoFormModal