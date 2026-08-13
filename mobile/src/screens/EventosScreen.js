import { useEffect, useMemo, useState } from 'react'
import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import CalendarioEventos from '../components/CalendarioEventos'
import EventoDetalhesModal from '../components/EventoDetalhesModal'
import { listarTodosEventos } from '../services/eventosService'
import styles from '../styles/eventosStyles'

const EVENTOS_POR_VEZ = 12

export default function EventosScreen({ navigation }) {
    const [eventos, setEventos] = useState([])
    const [eventoSelecionado, setEventoSelecionado] =
        useState(null)

    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('TODOS')
    const [visualizacao, setVisualizacao] =
        useState('cards')

    const [quantidadeVisivel, setQuantidadeVisivel] =
        useState(EVENTOS_POR_VEZ)

    const [carregando, setCarregando] =
        useState(true)

    const [atualizando, setAtualizando] =
        useState(false)

    const [erro, setErro] = useState('')

    async function carregarEventos() {
        try {
            setErro('')

            const dados =
                await listarTodosEventos()

            setEventos(dados)
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregando(false)
            setAtualizando(false)
        }
    }

    useEffect(() => {
        carregarEventos()
    }, [])

    function atualizar() {
        setAtualizando(true)
        setQuantidadeVisivel(EVENTOS_POR_VEZ)
        carregarEventos()
    }

    function normalizarTexto(texto = '') {
        return texto
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    const eventosFiltrados = useMemo(() => {
        const buscaNormalizada =
            normalizarTexto(busca)

        return eventos.filter((evento) => {
            const categoriaCorresponde =
                categoria === 'TODOS' ||
                evento.categoria === categoria

            if (!categoriaCorresponde) {
                return false
            }

            if (!buscaNormalizada) {
                return true
            }

            const textoEvento = normalizarTexto(
                [
                    evento.nome,
                    evento.localizacao,
                    evento.endereco,
                    evento.categoria,
                ]
                    .filter(Boolean)
                    .join(' '),
            )

            return textoEvento.includes(
                buscaNormalizada,
            )
        })
    }, [eventos, busca, categoria])

    const eventosVisiveis =
        eventosFiltrados.slice(
            0,
            quantidadeVisivel,
        )

    const possuiMaisEventos =
        quantidadeVisivel <
        eventosFiltrados.length

    function selecionarCategoria(
        novaCategoria,
    ) {
        setCategoria(novaCategoria)
        setQuantidadeVisivel(EVENTOS_POR_VEZ)
    }

    function carregarMais() {
        setQuantidadeVisivel(
            (quantidade) =>
                quantidade + EVENTOS_POR_VEZ,
        )
    }

    function formatarData(data) {
        if (!data) {
            return ''
        }

        return new Date(
            `${data}T12:00:00`,
        ).toLocaleDateString('pt-BR')
    }

    function formatarCategoria(
        categoriaEvento,
    ) {
        const categorias = {
            CULTURAL: 'Cultural',
            ESPORTE: 'Esporte',
            GASTRONOMICO: 'Gastronômico',
            LAZER: 'Lazer',
        }

        return (
            categorias[categoriaEvento] ||
            categoriaEvento ||
            'Evento'
        )
    }

    return (
        <View style={styles.pagina}>
            <StatusBar style="light" />

            <View style={styles.cabecalho}>
                <View>
                    <Text style={styles.marca}>
                        Petrópolis
                        <Text
                            style={
                                styles.marcaDestaque
                            }
                        >
                            Eventos
                        </Text>
                    </Text>

                    <Text style={styles.subtitulo}>
                        Descubra o que está
                        acontecendo na cidade
                    </Text>
                </View>

                <Pressable
                    style={styles.botaoEntrar}
                    onPress={() =>
                        navigation.navigate(
                            'Login',
                        )
                    }
                >
                    <Text
                        style={
                            styles.botaoEntrarTexto
                        }
                    >
                        Entrar
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={
                    styles.conteudo
                }
                refreshControl={
                    <RefreshControl
                        refreshing={atualizando}
                        onRefresh={atualizar}
                    />
                }
            >
                <View
                    style={styles.apresentacao}
                >
                    <Text style={styles.tag}>
                        AGENDA DE PETRÓPOLIS
                    </Text>

                    <Text style={styles.titulo}>
                        Eventos para você
                    </Text>

                    <Text
                        style={styles.descricao}
                    >
                        Gastronomia, cultura, lazer
                        e esporte reunidos em um só
                        lugar.
                    </Text>
                </View>

                <View style={styles.busca}>
                    <Text
                        style={styles.buscaIcone}
                    >
                        ⌕
                    </Text>

                    <TextInput
                        style={styles.buscaInput}
                        value={busca}
                        onChangeText={(texto) => {
                            setBusca(texto)
                            setQuantidadeVisivel(
                                EVENTOS_POR_VEZ,
                            )
                        }}
                        placeholder="Buscar eventos..."
                        placeholderTextColor="#9ca3af"
                        autoCorrect={false}
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.categorias
                    }
                >
                    {[
                        ['TODOS', 'Todos'],
                        ['CULTURAL', 'Cultural'],
                        ['ESPORTE', 'Esporte'],
                        [
                            'GASTRONOMICO',
                            'Gastronômico',
                        ],
                        ['LAZER', 'Lazer'],
                    ].map(([valor, texto]) => (
                        <Pressable
                            key={valor}
                            style={[
                                styles.categoriaBotao,
                                categoria ===
                                    valor &&
                                    styles.categoriaBotaoAtivo,
                            ]}
                            onPress={() =>
                                selecionarCategoria(
                                    valor,
                                )
                            }
                        >
                            <Text
                                style={[
                                    styles.categoriaTexto,
                                    categoria ===
                                        valor &&
                                        styles.categoriaTextoAtivo,
                                ]}
                            >
                                {texto}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <View
                    style={styles.visualizacao}
                >
                    <Pressable
                        style={[
                            styles.visualizacaoBotao,
                            visualizacao ===
                                'cards' &&
                                styles.visualizacaoBotaoAtivo,
                        ]}
                        onPress={() =>
                            setVisualizacao(
                                'cards',
                            )
                        }
                    >
                        <Text
                            style={[
                                styles.visualizacaoTexto,
                                visualizacao ===
                                    'cards' &&
                                    styles.visualizacaoTextoAtivo,
                            ]}
                        >
                            ▦ Cards
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.visualizacaoBotao,
                            visualizacao ===
                                'calendario' &&
                                styles.visualizacaoBotaoAtivo,
                        ]}
                        onPress={() =>
                            setVisualizacao(
                                'calendario',
                            )
                        }
                    >
                        <Text
                            style={[
                                styles.visualizacaoTexto,
                                visualizacao ===
                                    'calendario' &&
                                    styles.visualizacaoTextoAtivo,
                            ]}
                        >
                            □ Calendário
                        </Text>
                    </Pressable>
                </View>

                {!carregando && !erro && (
                    <Text
                        style={
                            styles.totalEventos
                        }
                    >
                        {eventosFiltrados.length}{' '}
                        {eventosFiltrados.length ===
                        1
                            ? 'evento encontrado'
                            : 'eventos encontrados'}
                    </Text>
                )}

                {carregando && (
                    <View style={styles.estado}>
                        <ActivityIndicator
                            size="large"
                        />

                        <Text
                            style={
                                styles.estadoTexto
                            }
                        >
                            Carregando eventos...
                        </Text>
                    </View>
                )}

                {!carregando && erro ? (
                    <View style={styles.estado}>
                        <Text
                            style={
                                styles.erroTitulo
                            }
                        >
                            Não foi possível carregar
                            os eventos
                        </Text>

                        <Text
                            style={
                                styles.estadoTexto
                            }
                        >
                            {erro}
                        </Text>

                        <Pressable
                            style={
                                styles.botaoTentar
                            }
                            onPress={
                                carregarEventos
                            }
                        >
                            <Text
                                style={
                                    styles.botaoTentarTexto
                                }
                            >
                                Tentar novamente
                            </Text>
                        </Pressable>
                    </View>
                ) : null}

                {!carregando &&
                    !erro &&
                    eventosFiltrados.length ===
                        0 && (
                        <View
                            style={styles.estado}
                        >
                            <Text
                                style={
                                    styles.estadoTexto
                                }
                            >
                                Nenhum evento
                                encontrado.
                            </Text>
                        </View>
                    )}

                {!carregando &&
                    !erro &&
                    eventosFiltrados.length > 0 &&
                    visualizacao === 'cards' && (
                        <>
                            {eventosVisiveis.map(
                                (evento) => (
                                    <View
                                        key={
                                            evento.id
                                        }
                                        style={
                                            styles.card
                                        }
                                    >
                                        <View
                                            style={
                                                styles.cardTopo
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.categoria
                                                }
                                            >
                                                {formatarCategoria(
                                                    evento.categoria,
                                                )}
                                            </Text>
                                        </View>

                                        <Text
                                            style={
                                                styles.eventoTitulo
                                            }
                                        >
                                            {
                                                evento.nome
                                            }
                                        </Text>

                                        <View
                                            style={
                                                styles.informacao
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.icone
                                                }
                                            >
                                                ◷
                                            </Text>

                                            <Text
                                                style={
                                                    styles.informacaoTexto
                                                }
                                            >
                                                {formatarData(
                                                    evento.dataInicio,
                                                )}

                                                {evento.dataFim &&
                                                    evento.dataFim !==
                                                        evento.dataInicio &&
                                                    ` até ${formatarData(
                                                        evento.dataFim,
                                                    )}`}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                styles.informacao
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.icone
                                                }
                                            >
                                                ⌖
                                            </Text>

                                            <Text
                                                style={
                                                    styles.informacaoTexto
                                                }
                                            >
                                                {
                                                    evento.localizacao
                                                }
                                            </Text>
                                        </View>

                                        {evento.endereco ? (
                                            <Text
                                                style={
                                                    styles.endereco
                                                }
                                            >
                                                {
                                                    evento.endereco
                                                }
                                            </Text>
                                        ) : null}

                                        <Pressable
                                            style={
                                                styles.botaoDetalhes
                                            }
                                            onPress={() =>
                                                setEventoSelecionado(
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

                            {possuiMaisEventos && (
                                <Pressable
                                    style={
                                        styles.botaoCarregarMais
                                    }
                                    onPress={
                                        carregarMais
                                    }
                                >
                                    <Text
                                        style={
                                            styles.botaoCarregarMaisTexto
                                        }
                                    >
                                        Carregar mais
                                        eventos
                                    </Text>

                                    <Text
                                        style={
                                            styles.botaoCarregarMaisIcone
                                        }
                                    >
                                        ↓
                                    </Text>
                                </Pressable>
                            )}
                        </>
                    )}

                {!carregando &&
                    !erro &&
                    eventosFiltrados.length > 0 &&
                    visualizacao ===
                        'calendario' && (
                        <CalendarioEventos
                            eventos={
                                eventosFiltrados
                            }
                            onSelecionarEvento={
                                setEventoSelecionado
                            }
                        />
                    )}
            </ScrollView>

            <EventoDetalhesModal
                evento={eventoSelecionado}
                onFechar={() =>
                    setEventoSelecionado(null)
                }
            />
        </View>
    )
}