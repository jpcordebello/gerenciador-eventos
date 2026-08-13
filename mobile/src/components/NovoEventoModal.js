import { useState } from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native'

import styles from '../styles/novoEventoModalStyles'

const CATEGORIAS = [
    ['CULTURAL', 'Cultural'],
    ['ESPORTE', 'Esporte'],
    ['GASTRONOMICO', 'Gastronômico'],
    ['LAZER', 'Lazer'],
]

export default function NovoEventoModal({
    visible,
    administradorId,
    onFechar,
    onSalvar,
}) {
    const [nome, setNome] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [endereco, setEndereco] = useState('')
    const [imagem, setImagem] = useState('')
    const [categoria, setCategoria] = useState('CULTURAL')
    const [erro, setErro] = useState('')
    const [salvando, setSalvando] = useState(false)

    function limparFormulario() {
        setNome('')
        setDataInicio('')
        setDataFim('')
        setLocalizacao('')
        setEndereco('')
        setImagem('')
        setCategoria('CULTURAL')
        setErro('')
    }

    function fechar() {
        if (salvando) {
            return
        }

        limparFormulario()
        onFechar()
    }

    async function salvar() {
        if (
            !nome.trim() ||
            !dataInicio.trim() ||
            !localizacao.trim()
        ) {
            setErro(
                'Preencha nome, data inicial e localização.',
            )
            return
        }

        try {
            setSalvando(true)
            setErro('')

            await onSalvar({
                nome: nome.trim(),

                dataInicio: dataInicio.trim(),

                dataFim:
                    dataFim.trim() || null,

                localizacao:
                    localizacao.trim(),

                endereco:
                    endereco.trim() || null,

                imagem:
                    imagem.trim() ||
                    'https://placehold.co/600x400?text=Petropolis+Eventos',

                categoria,

                adminId: administradorId,
            })

            limparFormulario()

            onFechar()
        } catch (error) {
            setErro(error.message)
        } finally {
            setSalvando(false)
        }
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
                            <View>
                                <Text style={styles.tag}>
                                    NOVO EVENTO
                                </Text>

                                <Text style={styles.titulo}>
                                    Cadastrar evento
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

                        {erro ? (
                            <View style={styles.erro}>
                                <Text style={styles.erroTexto}>
                                    {erro}
                                </Text>
                            </View>
                        ) : null}

                        <Text style={styles.label}>
                            Nome *
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                            placeholder="Nome do evento"
                            placeholderTextColor="#9ca3af"
                        />

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
                            placeholder="Ex.: Palácio de Cristal"
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
                            URL da imagem
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={imagem}
                            onChangeText={setImagem}
                            placeholder="https://..."
                            placeholderTextColor="#9ca3af"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={styles.label}>
                            Categoria *
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
                            <Text
                                style={
                                    styles.botaoSalvarTexto
                                }
                            >
                                {salvando
                                    ? 'Salvando...'
                                    : 'Salvar evento'}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.botaoCancelar}
                            onPress={fechar}
                            disabled={salvando}
                        >
                            <Text
                                style={
                                    styles.botaoCancelarTexto
                                }
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