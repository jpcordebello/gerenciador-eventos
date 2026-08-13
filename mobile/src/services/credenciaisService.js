import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const EMAIL_KEY = 'loginEmail'
const SENHA_KEY = 'loginSenha'

export async function salvarCredenciais(
    email,
    senha,
) {
    if (Platform.OS === 'web') {
        localStorage.setItem(
            EMAIL_KEY,
            email,
        )

        return
    }

    await SecureStore.setItemAsync(
        EMAIL_KEY,
        email,
    )

    await SecureStore.setItemAsync(
        SENHA_KEY,
        senha,
    )
}

export async function obterCredenciais() {
    if (Platform.OS === 'web') {
        return {
            email:
                localStorage.getItem(
                    EMAIL_KEY,
                ) || '',
            senha: '',
        }
    }

    const email =
        (await SecureStore.getItemAsync(
            EMAIL_KEY,
        )) || ''

    const senha =
        (await SecureStore.getItemAsync(
            SENHA_KEY,
        )) || ''

    return {
        email,
        senha,
    }
}

export async function removerCredenciais() {
    if (Platform.OS === 'web') {
        localStorage.removeItem(
            EMAIL_KEY,
        )

        return
    }

    await SecureStore.deleteItemAsync(
        EMAIL_KEY,
    )

    await SecureStore.deleteItemAsync(
        SENHA_KEY,
    )
}