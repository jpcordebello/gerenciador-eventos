import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: 'rgba(17,24,39,0.55)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    modal: {
        width: '100%',
        maxWidth: 480,
        maxHeight: '85%',
        backgroundColor: '#ffffff',
        borderRadius: 22,
        overflow: 'hidden',
    },

    fechar: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(17,24,39,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },

    fecharTexto: {
        color: '#ffffff',
        fontSize: 24,
        lineHeight: 26,
        fontWeight: '500',
    },

    imagem: {
        width: '100%',
        height: 200,
        backgroundColor: '#e8eaf2',
    },

    conteudo: {
        padding: 22,
    },

    categoria: {
        alignSelf: 'flex-start',
        color: '#5365f6',
        backgroundColor: '#eef0ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        marginBottom: 12,
    },

    titulo: {
        color: '#171c2b',
        fontSize: 23,
        lineHeight: 29,
        fontWeight: '800',
        marginBottom: 22,
    },

    informacao: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },

    icone: {
        width: 25,
        color: '#5365f6',
        fontSize: 17,
    },

    texto: {
        color: '#555c70',
        fontSize: 14,
        lineHeight: 20,
    },

    local: {
        flex: 1,
    },

    endereco: {
        color: '#969bad',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },

    botaoFechar: {
        height: 52,
        marginHorizontal: 22,
        marginBottom: 22,
        borderRadius: 13,
        backgroundColor: '#5365f6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoFecharTexto: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '800',
    },
})

export default styles