import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'authToken'

export async function salvarToken(token) {
    if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token)
        return
    }

    await SecureStore.setItemAsync(TOKEN_KEY, token)
}

export async function obterToken() {
    if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY)
    }

    return await SecureStore.getItemAsync(TOKEN_KEY)
}

export async function removerToken() {
    if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY)
        return
    }

    await SecureStore.deleteItemAsync(TOKEN_KEY)
}