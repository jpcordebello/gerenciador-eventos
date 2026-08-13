import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import EditarEventoModal from '../components/EditarEventoModal'
import NovoEventoModal from '../components/NovoEventoModal'

import { buscarAdministradorLogado } from '../services/administradorService'

import {
    atualizarEvento,
    cadastrarEvento,
    excluirEvento,
    listarEventosDoAdministrador,
} from '../services/eventosService'

import { removerToken } from '../services/tokenService'

import styles from '../styles/meusEventosStyles'

export default function MeusEventosScreen({ navigation }) {
    const [administrador, setAdministrador] = useState(null)
    const [eventos, setEventos] = useState([])

    const [carregando, setCarregando] = useState(true)
    const [atualizando, setAtualizando] = useState(false)

    const [erro, setErro] = useState('')

    const [excluindoId, setExcluindoId] = useState(null)

    const [novoEventoAberto, setNovoEventoAberto] =
        useState(false)

    const [eventoEditando, setEventoEditando] =
        useState(null)

    async function carregarDados() {
        try {
            setErro('')

            const admin =
                await buscarAdministradorLogado()

            setAdministrador(admin)

            const eventosDoAdmin =
                await listarEventosDoAdministrador(
                    admin.id,
                )

            setEventos(eventosDoAdmin || [])
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregando(false)
            setAtualizando(false)
        }
    }

    useEffect(() => {
        carregarDados()
    }, [])

    function atualizar() {
        setAtualizando(true)

        carregarDados()
    }

    async function sair() {
        await removerToken()

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Eventos',
                },
            ],
        })
    }

    async function handleCadastrarEvento(
        novoEvento,
    ) {
        if (!administrador?.id) {
            throw new Error(
                'Administrador não identificado.',
            )
        }

        const eventoCriado =
            await cadastrarEvento(
                novoEvento,
            )

        setEventos((eventosAtuais) => [
            eventoCriado,
            ...eventosAtuais,
        ])

        return eventoCriado
    }

    async function handleAtualizarEvento(
        eventoId,
        dadosAtualizados,
    ) {
        const eventoAtualizado =
            await atualizarEvento(
                eventoId,
                dadosAtualizados,
            )

        setEventos((eventosAtuais) =>
            eventosAtuais.map((evento) =>
                evento.id === eventoId
                    ? eventoAtualizado
                    : evento,
            ),
        )

        if (Platform.OS === 'web') {
            window.alert(
                'Evento atualizado com sucesso!',
            )
        } else {
            Alert.alert(
                'Sucesso',
                'Evento atualizado com sucesso!',
            )
        }

        return eventoAtualizado
    }

    async function handleExcluir(eventoId) {
        try {
            setErro('')
            setExcluindoId(eventoId)

            await excluirEvento(eventoId)

            setEventos((eventosAtuais) =>
                eventosAtuais.filter(
                    (evento) =>
                        evento.id !== eventoId,
                ),
            )
        } catch (error) {
            setErro(error.message)
        } finally {
            setExcluindoId(null)
        }
    }

    function confirmarExclusao(evento) {
        if (Platform.OS === 'web') {
            const confirmou = window.confirm(
                `Deseja excluir o evento "${evento.nome}"?`,
            )

            if (confirmou) {
                handleExcluir(evento.id)
            }

            return
        }

        Alert.alert(
            'Excluir evento',
            `Deseja excluir o evento "${evento.nome}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () =>
                        handleExcluir(evento.id),
                },
            ],
        )
    }

    function formatarData(data) {
        if (!data) {
            return ''
        }

        return new Date(
            `${data}T12:00:00`,
        ).toLocaleDateString(
            'pt-BR',
        )
    }

    return (
        <View style={styles.pagina}>
            <StatusBar style="light" />

            <View style={styles.cabecalho}>
                <View
                    style={
                        styles.cabecalhoTexto
                    }
                >
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

                    <Text style={styles.usuario}>
                        {administrador
                            ? `Olá, ${administrador.nome}`
                            : 'Área do administrador'}
                    </Text>
                </View>

                <Pressable
                    style={styles.botaoSair}
                    onPress={sair}
                >
                    <Text
                        style={
                            styles.botaoSairTexto
                        }
                    >
                        Sair
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
                    style={
                        styles.tituloArea
                    }
                >
                    <View>
                        <Text style={styles.tag}>
                            PAINEL DO ADMINISTRADOR
                        </Text>

                        <Text
                            style={
                                styles.titulo
                            }
                        >
                            Meus eventos
                        </Text>

                        <Text
                            style={
                                styles.descricao
                            }
                        >
                            Gerencie os eventos
                            publicados por você.
                        </Text>
                    </View>

                    <Pressable
                        style={
                            styles.botaoNovo
                        }
                        onPress={() =>
                            setNovoEventoAberto(
                                true,
                            )
                        }
                        disabled={!administrador}
                    >
                        <Text
                            style={
                                styles.botaoNovoTexto
                            }
                        >
                            + Novo evento
                        </Text>
                    </Pressable>
                </View>

                {carregando && (
                    <View
                        style={
                            styles.estado
                        }
                    >
                        <ActivityIndicator
                            size="large"
                        />

                        <Text
                            style={
                                styles.estadoTexto
                            }
                        >
                            Carregando seus eventos...
                        </Text>
                    </View>
                )}

                {!carregando && erro ? (
                    <View
                        style={
                            styles.estado
                        }
                    >
                        <Text
                            style={
                                styles.erroTitulo
                            }
                        >
                            Não foi possível carregar
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
                                carregarDados
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
                    eventos.length === 0 && (
                        <View
                            style={
                                styles.estado
                            }
                        >
                            <Text
                                style={
                                    styles.vazioTitulo
                                }
                            >
                                Nenhum evento cadastrado
                            </Text>

                            <Text
                                style={
                                    styles.estadoTexto
                                }
                            >
                                Seus eventos aparecerão aqui.
                            </Text>
                        </View>
                    )}

                {!carregando &&
                    eventos.map(
                        (evento) => (
                            <View
                                key={evento.id}
                                style={
                                    styles.card
                                }
                            >
                                {evento.imagem ? (
                                    <Image
                                        source={{
                                            uri:
                                                evento.imagem,
                                        }}
                                        style={
                                            styles.imagem
                                        }
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View
                                        style={
                                            styles.imagemPlaceholder
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.imagemPlaceholderTexto
                                            }
                                        >
                                            PetrópolisEventos
                                        </Text>
                                    </View>
                                )}

                                <View
                                    style={
                                        styles.cardConteudo
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
                                            {evento.categoria ||
                                                'EVENTO'}
                                        </Text>
                                    </View>

                                    <Text
                                        style={
                                            styles.eventoTitulo
                                        }
                                    >
                                        {evento.nome}
                                    </Text>

                                    <Text
                                        style={
                                            styles.informacao
                                        }
                                    >
                                        ◷{' '}
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

                                    <Text
                                        style={
                                            styles.informacao
                                        }
                                    >
                                        ⌖{' '}
                                        {
                                            evento.localizacao
                                        }
                                    </Text>

                                    <View
                                        style={
                                            styles.acoes
                                        }
                                    >
                                        <Pressable
                                            style={
                                                styles.botaoEditar
                                            }
                                            onPress={() =>
                                                setEventoEditando(
                                                    evento,
                                                )
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.botaoEditarTexto
                                                }
                                            >
                                                Editar
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={
                                                styles.botaoExcluir
                                            }
                                            onPress={() =>
                                                confirmarExclusao(
                                                    evento,
                                                )
                                            }
                                            disabled={
                                                excluindoId ===
                                                evento.id
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.botaoExcluirTexto
                                                }
                                            >
                                                {excluindoId ===
                                                evento.id
                                                    ? 'Excluindo...'
                                                    : 'Excluir'}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        ),
                    )}
            </ScrollView>

            <NovoEventoModal
                visible={
                    novoEventoAberto
                }
                administradorId={
                    administrador?.id
                }
                onFechar={() =>
                    setNovoEventoAberto(
                        false,
                    )
                }
                onSalvar={
                    handleCadastrarEvento
                }
            />

            <EditarEventoModal
                visible={
                    eventoEditando !== null
                }
                evento={
                    eventoEditando
                }
                onFechar={() =>
                    setEventoEditando(
                        null,
                    )
                }
                onSalvar={
                    handleAtualizarEvento
                }
            />
        </View>
    )
}