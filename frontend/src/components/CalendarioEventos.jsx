import { useMemo, useState } from 'react'

import '../styles/calendario-eventos.css'

const MESES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

const DIAS_SEMANA = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
]

function CalendarioEventos({
    eventos,
    onSelecionarEvento,
}) {
    const primeiraData = eventos[0]?.dataInicio
        ? new Date(`${eventos[0].dataInicio}T12:00:00`)
        : new Date()

    const [dataAtual, setDataAtual] = useState(
        new Date(
            primeiraData.getFullYear(),
            primeiraData.getMonth(),
            1,
        ),
    )

    const ano = dataAtual.getFullYear()
    const mes = dataAtual.getMonth()

    const diasCalendario = useMemo(() => {
        const primeiroDia = new Date(
            ano,
            mes,
            1,
        ).getDay()

        const quantidadeDias = new Date(
            ano,
            mes + 1,
            0,
        ).getDate()

        const dias = []

        for (let i = 0; i < primeiroDia; i += 1) {
            dias.push(null)
        }

        for (
            let dia = 1;
            dia <= quantidadeDias;
            dia += 1
        ) {
            dias.push(dia)
        }

        return dias
    }, [ano, mes])

    function eventosDoDia(dia) {
        if (!dia) return []

        const dataDoCalendario = new Date(
            ano,
            mes,
            dia,
            12,
        )

        return eventos.filter((evento) => {
            if (!evento.dataInicio) {
                return false
            }

            const dataInicio = new Date(
                `${evento.dataInicio}T12:00:00`,
            )

            const dataFim = evento.dataFim
                ? new Date(`${evento.dataFim}T12:00:00`)
                : dataInicio

            return (
                dataDoCalendario >= dataInicio &&
                dataDoCalendario <= dataFim
            )
        })
    }

    function mesAnterior() {
        setDataAtual(
            new Date(ano, mes - 1, 1),
        )
    }

    function proximoMes() {
        setDataAtual(
            new Date(ano, mes + 1, 1),
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

    return (
        <div className="calendario">
            <div className="calendario-topo">
                <button
                    type="button"
                    onClick={mesAnterior}
                    aria-label="Mês anterior"
                >
                    ←
                </button>

                <div>
                    <span>Agenda mensal</span>

                    <h3>
                        {MESES[mes]} {ano}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={proximoMes}
                    aria-label="Próximo mês"
                >
                    →
                </button>
            </div>

            <div className="calendario-semana">
                {DIAS_SEMANA.map((dia) => (
                    <span key={dia}>
                        {dia}
                    </span>
                ))}
            </div>

            <div className="calendario-grade">
                {diasCalendario.map((dia, indice) => {
                    const eventosDia =
                        eventosDoDia(dia)

                    return (
                        <div
                            className={`calendario-dia ${!dia
                                ? 'calendario-dia-vazio'
                                : ''
                                }`}
                            key={`${dia}-${indice}`}
                        >
                            {dia && (
                                <>
                                    <span className="calendario-numero">
                                        {dia}
                                    </span>

                                    <div className="calendario-eventos-dia">
                                        {eventosDia
                                            .slice(0, 2)
                                            .map((evento) => (
                                                <button
                                                    type="button"
                                                    className={`calendario-evento calendario-${evento.categoria.toLowerCase()}`}
                                                    key={evento.id}
                                                    onClick={() =>
                                                        onSelecionarEvento(
                                                            evento,
                                                        )
                                                    }
                                                    title={evento.nome}
                                                >
                                                    <span>
                                                        {formatarCategoria(
                                                            evento.categoria,
                                                        )}
                                                    </span>

                                                    {evento.nome}
                                                </button>
                                            ))}

                                        {eventosDia.length > 2 && (
                                            <span className="calendario-mais">
                                                + {eventosDia.length - 2}{' '}
                                                evento(s)
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarioEventos