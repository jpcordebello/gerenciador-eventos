import { useState } from 'react'
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { cadastrarAdministrador } from '../services/administradorService'
import styles from '../styles/cadastroStyles'

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [carregando, setCarregando] = useState(false)

    async function cadastrar() {
        if (
            !nome.trim() ||
            !email.trim() ||
            !senha ||
            !confirmarSenha
        ) {
            setErro('Preencha todos os campos.')
            setSucesso('')
            return
        }

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.')
            setSucesso('')
            return
        }

        try {
            setCarregando(true)
            setErro('')
            setSucesso('')

            await cadastrarAdministrador({
                nome: nome.trim(),
                email: email.trim(),
                senha,
            })

            setSucesso(
                'Administrador cadastrado com sucesso!',
            )

            setNome('')
            setEmail('')
            setSenha('')
            setConfirmarSenha('')
        } catch (error) {
            setErro(error.message)
        } finally {
            setCarregando(false)
        }
    }

    return (
        <View style={styles.pagina}>
            <StatusBar style="dark" />

            <ScrollView
                contentContainerStyle={styles.conteudo}
                keyboardShouldPersistTaps="handled"
            >
                <Pressable
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.voltarTexto}>
                        ← Voltar
                    </Text>
                </Pressable>

                <View style={styles.cabecalho}>
                    <Text style={styles.marca}>
                        Petrópolis
                        <Text style={styles.marcaDestaque}>
                            Eventos
                        </Text>
                    </Text>

                    <Text style={styles.titulo}>
                        Criar conta
                    </Text>

                    <Text style={styles.descricao}>
                        Cadastre-se como administrador para
                        publicar e gerenciar seus eventos.
                    </Text>
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.label}>
                        Nome
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Seu nome"
                        value={nome}
                        onChangeText={setNome}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>
                        E-mail
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>
                        Senha
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <Text style={styles.label}>
                        Confirmar senha
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite a senha novamente"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry
                    />

                    {erro ? (
                        <Text style={styles.erro}>
                            {erro}
                        </Text>
                    ) : null}

                    {sucesso ? (
                        <View style={styles.sucessoArea}>
                            <Text style={styles.sucesso}>
                                {sucesso}
                            </Text>

                            <Pressable
                                onPress={() =>
                                    navigation.navigate(
                                        'Login',
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.irParaLogin
                                    }
                                >
                                    Ir para o login
                                </Text>
                            </Pressable>
                        </View>
                    ) : null}

                    <Pressable
                        style={[
                            styles.botaoCadastrar,
                            carregando &&
                                styles.botaoDesabilitado,
                        ]}
                        onPress={cadastrar}
                        disabled={carregando}
                    >
                        {carregando ? (
                            <ActivityIndicator />
                        ) : (
                            <Text
                                style={
                                    styles.botaoCadastrarTexto
                                }
                            >
                                Cadastrar
                            </Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}