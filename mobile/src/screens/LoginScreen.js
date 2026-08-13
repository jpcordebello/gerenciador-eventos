import { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { login } from '../services/authService'
import {
    obterCredenciais,
    removerCredenciais,
    salvarCredenciais,
} from '../services/credenciaisService'
import { salvarToken } from '../services/tokenService'
import styles from '../styles/loginStyles'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [gravarSenha, setGravarSenha] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function carregarCredenciais() {
            try {
                const credenciais =
                    await obterCredenciais()

                if (
                    credenciais.email ||
                    credenciais.senha
                ) {
                    setEmail(
                        credenciais.email || '',
                    )

                    setSenha(
                        credenciais.senha || '',
                    )

                    setGravarSenha(true)
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar credenciais:',
                    error.message,
                )
            }
        }

        carregarCredenciais()
    }, [])

    async function alternarGravarSenha() {
        const novoValor = !gravarSenha

        setGravarSenha(novoValor)

        if (!novoValor) {
            await removerCredenciais()
        }
    }

    async function handleLogin() {
        if (!email.trim() || !senha) {
            setErro(
                'Informe o e-mail e a senha.',
            )

            return
        }

        try {
            setCarregando(true)
            setErro('')

            const dados = await login(
                email.trim(),
                senha,
            )

            await salvarToken(dados.token)

            if (gravarSenha) {
                await salvarCredenciais(
                    email.trim(),
                    senha,
                )
            } else {
                await removerCredenciais()
            }

            navigation.replace(
                'MeusEventos',
            )
        } catch (error) {
            setErro(
                error.message ||
                    'Não foi possível realizar o login.',
            )
        } finally {
            setCarregando(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.pagina}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >
            <StatusBar style="dark" />

            <ScrollView
                contentContainerStyle={
                    styles.scroll
                }
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={
                        styles.apresentacao
                    }
                >
                    <View style={styles.logo}>
                        <Text
                            style={
                                styles.logoTexto
                            }
                        >
                            P
                        </Text>
                    </View>

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

                    <View style={styles.tag}>
                        <Text
                            style={
                                styles.tagTexto
                            }
                        >
                            AGENDA DE PETRÓPOLIS
                        </Text>
                    </View>

                    <Text
                        style={
                            styles.tituloPrincipal
                        }
                    >
                        Sua cidade.
                        {'\n'}
                        <Text
                            style={
                                styles.tituloDestaque
                            }
                        >
                            Seus eventos.
                        </Text>
                    </Text>

                    <Text
                        style={
                            styles.descricao
                        }
                    >
                        Acesse sua conta para cadastrar e
                        gerenciar os eventos publicados na
                        plataforma.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text
                        style={
                            styles.bemVindo
                        }
                    >
                        BEM-VINDO
                    </Text>

                    <Text style={styles.titulo}>
                        Entrar
                    </Text>

                    <Text
                        style={
                            styles.subtitulo
                        }
                    >
                        Informe seus dados para acessar sua
                        conta.
                    </Text>

                    <View
                        style={
                            styles.campo
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            E-mail
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={
                                setEmail
                            }
                            placeholder="seuemail@exemplo.com"
                            placeholderTextColor="#9ca3af"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                        />
                    </View>

                    <View
                        style={
                            styles.campo
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Senha
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={senha}
                            onChangeText={
                                setSenha
                            }
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9ca3af"
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="current-password"
                        />
                    </View>

                    {erro ? (
                        <Text
                            style={
                                styles.erro
                            }
                        >
                            {erro}
                        </Text>
                    ) : null}

                    <Pressable
                        style={
                            styles.lembrar
                        }
                        onPress={
                            alternarGravarSenha
                        }
                    >
                        <View
                            style={[
                                styles.checkbox,
                                gravarSenha &&
                                    styles.checkboxAtivo,
                            ]}
                        >
                            {gravarSenha && (
                                <Text
                                    style={
                                        styles.checkboxMarca
                                    }
                                >
                                    ✓
                                </Text>
                            )}
                        </View>

                        <Text
                            style={
                                styles.lembrarTexto
                            }
                        >
                            Gravar senha
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({
                            pressed,
                        }) => [
                            styles.botao,
                            pressed &&
                                styles.botaoPressionado,
                        ]}
                        onPress={
                            handleLogin
                        }
                        disabled={
                            carregando
                        }
                    >
                        <Text
                            style={
                                styles.botaoTexto
                            }
                        >
                            {carregando
                                ? 'Entrando...'
                                : 'Entrar'}
                        </Text>

                        {!carregando && (
                            <Text
                                style={
                                    styles.botaoSeta
                                }
                            >
                                →
                            </Text>
                        )}
                    </Pressable>

                    <View
                        style={
                            styles.cadastro
                        }
                    >
                        <Text
                            style={
                                styles.cadastroTexto
                            }
                        >
                            Ainda não possui uma conta?
                        </Text>

                        <Pressable
                            onPress={() =>
                                navigation.navigate(
                                    'Cadastro',
                                )
                            }
                        >
                            <Text
                                style={
                                    styles.cadastreSe
                                }
                            >
                                Cadastre-se
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}