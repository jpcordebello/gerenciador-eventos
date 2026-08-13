import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native'

import styles from '../styles/eventoDetalhesModalStyles'

export default function EventoDetalhesModal({
    evento,
    onFechar,
}) {
    if (!evento) {
        return null
    }

    function formatarData(data) {
        if (!data) {
            return ''
        }

        return new Date(
            `${data}T12:00:00`,
        ).toLocaleDateString('pt-BR')
    }

    function formatarCategoria(categoria) {
        const categorias = {
            CULTURAL: 'Cultural',
            ESPORTE: 'Esporte',
            GASTRONOMICO: 'Gastronômico',
            LAZER: 'Lazer',
        }

        return categorias[categoria] || categoria
    }

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            onRequestClose={onFechar}
        >
            <View style={styles.fundo}>
                <View style={styles.modal}>
                    <Pressable
                        style={styles.fechar}
                        onPress={onFechar}
                    >
                        <Text style={styles.fecharTexto}>
                            ×
                        </Text>
                    </Pressable>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {evento.imagem ? (
                            <Image
                                source={{
                                    uri: evento.imagem,
                                }}
                                style={styles.imagem}
                                resizeMode="cover"
                            />
                        ) : null}

                        <View style={styles.conteudo}>
                            <Text style={styles.categoria}>
                                {formatarCategoria(
                                    evento.categoria,
                                )}
                            </Text>

                            <Text style={styles.titulo}>
                                {evento.nome}
                            </Text>

                            <View style={styles.informacao}>
                                <Text style={styles.icone}>
                                    ◷
                                </Text>

                                <Text style={styles.texto}>
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

                            <View style={styles.informacao}>
                                <Text style={styles.icone}>
                                    ⌖
                                </Text>

                                <View style={styles.local}>
                                    <Text style={styles.texto}>
                                        {evento.localizacao}
                                    </Text>

                                    {evento.endereco ? (
                                        <Text
                                            style={
                                                styles.endereco
                                            }
                                        >
                                            {evento.endereco}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={styles.botaoFechar}
                        onPress={onFechar}
                    >
                        <Text
                            style={styles.botaoFecharTexto}
                        >
                            Fechar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}