import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    pagina: {
        flex: 1,
        backgroundColor: '#f7f8fc',
    },

    conteudo: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 40,
    },

    voltar: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    voltarTexto: {
        color: '#5365f6',
        fontSize: 14,
        fontWeight: '700',
    },

    cabecalho: {
        marginBottom: 28,
    },

    marca: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1d2433',
        marginBottom: 28,
    },

    marcaDestaque: {
        color: '#5365f6',
    },

    titulo: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1d2433',
        marginBottom: 8,
    },

    descricao: {
        fontSize: 15,
        lineHeight: 22,
        color: '#687083',
        maxWidth: 420,
    },

    formulario: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 22,
        borderWidth: 1,
        borderColor: '#e8ebf3',
    },

    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#343b4d',
        marginBottom: 7,
        marginTop: 14,
    },

    input: {
        width: '100%',
        minHeight: 48,
        borderWidth: 1,
        borderColor: '#dfe3ec',
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: '#ffffff',
        color: '#1d2433',
        fontSize: 15,
    },

    erro: {
        marginTop: 16,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff1f1',
        color: '#b42318',
        fontSize: 13,
        fontWeight: '600',
    },

    sucessoArea: {
        marginTop: 16,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#edfdf4',
    },

    sucesso: {
        color: '#027a48',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
    },

    irParaLogin: {
        color: '#5365f6',
        fontSize: 13,
        fontWeight: '800',
    },

    botaoCadastrar: {
        minHeight: 50,
        borderRadius: 12,
        backgroundColor: '#5365f6',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },

    botaoCadastrarTexto: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '800',
    },

    botaoDesabilitado: {
        opacity: 0.6,
    },
})

export default styles