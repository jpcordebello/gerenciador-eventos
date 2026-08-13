import { useMemo, useState } from 'react'
import {
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native'

import styles from '../styles/calendarioEventosStyles'

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
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
]

export default function CalendarioEventos({
    eventos,
    onSelecionarEvento,
}) {
    const hoje = new Date()

    const [ano, setAno] =
        useState(hoje.getFullYear())

    const [mes, setMes] =
        useState(hoje.getMonth())

    const [diaSelecionado, setDiaSelecionado] =
        useState(null)

    const diasDoCalendario = useMemo(() => {
        const primeiroDia =
            new Date(ano, mes, 1).getDay()

        const quantidadeDias =
            new Date(
                ano,
                mes + 1,
                0,
            ).getDate()

        const dias = []

        for (
            let i = 0;
            i < primeiroDia;
            i += 1
        ) {
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
        if (!dia) {
            return []
        }

        const dataCalendario =
            new Date(
                ano,
                mes,
                dia,
                12,
            )

        return eventos.filter(
            (evento) => {
                if (!evento.dataInicio) {
                    return false
                }

                const dataInicio =
                    new Date(
                        `${evento.dataInicio}T12:00:00`,
                    )

                const dataFim =
                    evento.dataFim
                        ? new Date(
                              `${evento.dataFim}T12:00:00`,
                          )
                        : dataInicio

                return (
                    dataCalendario >=
                        dataInicio &&
                    dataCalendario <=
                        dataFim
                )
            },
        )
    }

    function mesAnterior() {
        setDiaSelecionado(null)

        if (mes === 0) {
            setMes(11)
            setAno((valor) => valor - 1)
            return
        }

        setMes((valor) => valor - 1)
    }

    function proximoMes() {
        setDiaSelecionado(null)

        if (mes === 11) {
            setMes(0)
            setAno((valor) => valor + 1)
            return
        }

        setMes((valor) => valor + 1)
    }

    const eventosSelecionados =
        diaSelecionado
            ? eventosDoDia(diaSelecionado)
            : []

    return (
        <View style={styles.container}>
            <View style={styles.topo}>
                <Pressable
                    style={styles.botaoMes}
                    onPress={mesAnterior}
                >
                    <Text style={styles.botaoMesTexto}>
                        ‹
                    </Text>
                </Pressable>

                <View>
                    <Text style={styles.mesTitulo}>
                        {MESES[mes]}
                    </Text>

                    <Text style={styles.anoTexto}>
                        {ano}
                    </Text>
                </View>

                <Pressable
                    style={styles.botaoMes}
                    onPress={proximoMes}
                >
                    <Text style={styles.botaoMesTexto}>
                        ›
                    </Text>
                </Pressable>
            </View>

            <View style={styles.diasSemana}>
                {DIAS_SEMANA.map(
                    (dia, indice) => (
                        <Text
                            key={`${dia}-${indice}`}
                            style={styles.diaSemana}
                        >
                            {dia}
                        </Text>
                    ),
                )}
            </View>

            <View style={styles.grade}>
                {diasDoCalendario.map(
                    (dia, indice) => {
                        const eventosDia =
                            eventosDoDia(dia)

                        const possuiEvento =
                            eventosDia.length > 0

                        const selecionado =
                            dia !== null &&
                            diaSelecionado === dia

                        return (
                            <Pressable
                                key={indice}
                                disabled={!dia}
                                style={[
                                    styles.dia,
                                    selecionado &&
                                        styles.diaSelecionado,
                                ]}
                                onPress={() =>
                                    setDiaSelecionado(
                                        dia,
                                    )
                                }
                            >
                                {dia && (
                                    <>
                                        <Text
                                            style={[
                                                styles.diaTexto,
                                                selecionado &&
                                                    styles.diaTextoSelecionado,
                                            ]}
                                        >
                                            {dia}
                                        </Text>

                                        {possuiEvento && (
                                            <View
                                                style={[
                                                    styles.marcador,
                                                    selecionado &&
                                                        styles.marcadorSelecionado,
                                                ]}
                                            />
                                        )}
                                    </>
                                )}
                            </Pressable>
                        )
                    },
                )}
            </View>

            {diaSelecionado && (
                <View style={styles.eventosDia}>
                    <Text style={styles.eventosDiaTitulo}>
                        {diaSelecionado} de {MESES[mes]}
                    </Text>

                    {eventosSelecionados.length === 0 ? (
                        <Text style={styles.semEvento}>
                            Nenhum evento neste dia.
                        </Text>
                    ) : (
                        <ScrollView>
                            {eventosSelecionados.map(
                                (evento) => (
                                    <View
                                        key={evento.id}
                                        style={styles.evento}
                                    >
                                        <Text
                                            style={
                                                styles.eventoCategoria
                                            }
                                        >
                                            {evento.categoria}
                                        </Text>

                                        <Text
                                            style={
                                                styles.eventoTitulo
                                            }
                                        >
                                            {evento.nome}
                                        </Text>

                                        <Text
                                            style={
                                                styles.eventoLocal
                                            }
                                        >
                                            ⌖ {evento.localizacao}
                                        </Text>

                                        <Pressable
                                            style={
                                                styles.botaoDetalhes
                                            }
                                            onPress={() =>
                                                onSelecionarEvento(
                                                    evento,
                                                )
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.botaoDetalhesTexto
                                                }
                                            >
                                                Ver detalhes
                                            </Text>

                                            <Text
                                                style={
                                                    styles.botaoDetalhesSeta
                                                }
                                            >
                                                →
                                            </Text>
                                        </Pressable>
                                    </View>
                                ),
                            )}
                        </ScrollView>
                    )}
                </View>
            )}
        </View>
    )
}