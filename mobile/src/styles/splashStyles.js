import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5064f6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    conteudo: {
        alignItems: 'center',
    },

    logo: {
        width: 78,
        height: 78,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    logoTexto: {
        color: '#5365f6',
        fontSize: 34,
        fontWeight: '800',
    },

    marca: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '800',
    },

    destaque: {
        color: '#84edf1',
    },

    subtitulo: {
        color: '#e8ebff',
        marginTop: 12,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
    },
})

export default styles