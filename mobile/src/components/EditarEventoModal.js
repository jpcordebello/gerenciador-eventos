import { useEffect, useState } from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native'

import styles from '../styles/editarEventoModalStyles'

const CATEGORIAS = [
    ['CULTURAL', 'Cultural'],
    ['ESPORTE', 'Esporte'],
    ['GASTRONOMICO', 'Gastronômico'],
    ['LAZER', 'Lazer'],
]

export default function EditarEventoModal({
    visible,
    evento,
    onFechar,
    onSalvar,
}) {
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [endereco, setEndereco] = useState('')
    const [categoria, setCategoria] = useState('CULTURAL')

    const [erro, setErro] = useState('')
    const [salvando, setSalvando] = useState(false)

    useEffect(() => {
        if (!evento) {
            return
        }

        setDataInicio(evento.dataInicio || '')
        setDataFim(evento.dataFim || '')
        setLocalizacao(evento.localizacao || '')
        setEndereco(evento.endereco || '')
        setCategoria(evento.categoria || 'CULTURAL')
        setErro('')
    }, [evento, visible])

    function fechar() {
        if (salvando) {
            return
        }

        setErro('')
        onFechar()
    }

    async function salvar() {
        if (
            !dataInicio.trim() ||
            !localizacao.trim()
        ) {
            setErro(
                'Preencha a data inicial e a localização.',
            )
            return
        }

        try {
            setSalvando(true)
            setErro('')

            await onSalvar(evento.id, {
                dataInicio: dataInicio.trim(),
                dataFim:
                    dataFim.trim() || null,
                localizacao:
                    localizacao.trim(),
                endereco:
                    endereco.trim() || null,
                categoria,
            })

            onFechar()
        } catch (error) {
            setErro(error.message)
        } finally {
            setSalvando(false)
        }
    }

    if (!evento) {
        return null
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={fechar}
        >
            <View style={styles.fundo}>
                <View style={styles.modal}>
                    <ScrollView
                        contentContainerStyle={styles.conteudo}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.cabecalho}>
                            <View style={styles.cabecalhoTexto}>
                                <Text style={styles.tag}>
                                    EDITAR EVENTO
                                </Text>

                                <Text style={styles.titulo}>
                                    {evento.nome}
                                </Text>
                            </View>

                            <Pressable
                                style={styles.fechar}
                                onPress={fechar}
                            >
                                <Text style={styles.fecharTexto}>
                                    ×
                                </Text>
                            </Pressable>
                        </View>

                        <Text style={styles.aviso}>
                            Altere os dados do evento abaixo.
                        </Text>

                        {erro ? (
                            <View style={styles.erro}>
                                <Text style={styles.erroTexto}>
                                    {erro}
                                </Text>
                            </View>
                        ) : null}

                        <Text style={styles.label}>
                            Data inicial *
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={dataInicio}
                            onChangeText={setDataInicio}
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor="#9ca3af"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>
                            Data final
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={dataFim}
                            onChangeText={setDataFim}
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor="#9ca3af"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>
                            Localização *
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={localizacao}
                            onChangeText={setLocalizacao}
                            placeholder="Local do evento"
                            placeholderTextColor="#9ca3af"
                        />

                        <Text style={styles.label}>
                            Endereço
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={endereco}
                            onChangeText={setEndereco}
                            placeholder="Endereço do evento"
                            placeholderTextColor="#9ca3af"
                        />

                        <Text style={styles.label}>
                            Categoria
                        </Text>

                        <View style={styles.categorias}>
                            {CATEGORIAS.map(
                                ([valor, texto]) => (
                                    <Pressable
                                        key={valor}
                                        style={[
                                            styles.categoria,
                                            categoria === valor &&
                                                styles.categoriaAtiva,
                                        ]}
                                        onPress={() =>
                                            setCategoria(valor)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.categoriaTexto,
                                                categoria === valor &&
                                                    styles.categoriaTextoAtivo,
                                            ]}
                                        >
                                            {texto}
                                        </Text>
                                    </Pressable>
                                ),
                            )}
                        </View>

                        <Pressable
                            style={[
                                styles.botaoSalvar,
                                salvando &&
                                    styles.botaoDesabilitado,
                            ]}
                            onPress={salvar}
                            disabled={salvando}
                        >
                            <Text style={styles.botaoSalvarTexto}>
                                {salvando
                                    ? 'Salvando...'
                                    : 'Salvar alterações'}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.botaoCancelar}
                            onPress={fechar}
                            disabled={salvando}
                        >
                            <Text
                                style={styles.botaoCancelarTexto}
                            >
                                Cancelar
                            </Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}