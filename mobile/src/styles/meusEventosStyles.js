import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    pagina: {
        flex: 1,
        backgroundColor: '#f4f6fb',
    },

    cabecalho: {
        paddingTop: 52,
        paddingHorizontal: 22,
        paddingBottom: 20,
        backgroundColor: '#5064f6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cabecalhoTexto: {
        flex: 1,
    },

    marca: {
        color: '#ffffff',
        fontSize: 19,
        fontWeight: '800',
    },

    marcaDestaque: {
        color: '#84edf1',
    },

    usuario: {
        color: '#e8ebff',
        fontSize: 12,
        marginTop: 4,
    },

    botaoSair: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 11,
        paddingHorizontal: 15,
        paddingVertical: 9,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },

    botaoSairTexto: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '800',
    },

    conteudo: {
        padding: 20,
        paddingBottom: 50,
    },

    tituloArea: {
        marginBottom: 24,
    },

    tag: {
        color: '#5365f6',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 7,
    },

    titulo: {
        color: '#111827',
        fontSize: 28,
        fontWeight: '800',
    },

    descricao: {
        color: '#7a8092',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 17,
    },

    botaoNovo: {
        alignSelf: 'flex-start',
        backgroundColor: '#5365f6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 11,
    },

    botaoNovoTexto: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '800',
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eceef5',
    },

    imagem: {
        width: '100%',
        height: 160,
        backgroundColor: '#e8eaf2',
    },

    imagemPlaceholder: {
        width: '100%',
        height: 125,
        backgroundColor: '#e9ecff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagemPlaceholderTexto: {
        color: '#5365f6',
        fontWeight: '800',
    },

    cardConteudo: {
        padding: 18,
    },

    cardTopo: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    categoria: {
        color: '#5365f6',
        backgroundColor: '#eef0ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10,
        fontWeight: '800',
    },

    eventoTitulo: {
        color: '#171c2b',
        fontSize: 19,
        lineHeight: 24,
        fontWeight: '800',
        marginBottom: 13,
    },

    informacao: {
        color: '#60677b',
        fontSize: 13,
        marginBottom: 8,
    },

    acoes: {
        flexDirection: 'row',
        marginTop: 13,
        gap: 10,
    },

    botaoEditar: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#5365f6',
        borderRadius: 11,
        paddingVertical: 10,
        alignItems: 'center',
    },

    botaoEditarTexto: {
        color: '#5365f6',
        fontSize: 13,
        fontWeight: '800',
    },

    botaoExcluir: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f0a5b4',
        borderRadius: 11,
        paddingVertical: 10,
        alignItems: 'center',
    },

    botaoExcluirTexto: {
        color: '#be123c',
        fontSize: 13,
        fontWeight: '800',
    },

    estado: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    estadoTexto: {
        color: '#7a8092',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },

    vazioTitulo: {
        color: '#252b3a',
        fontSize: 17,
        fontWeight: '800',
    },

    erroTitulo: {
        color: '#be123c',
        fontSize: 17,
        fontWeight: '800',
    },

    botaoTentar: {
        backgroundColor: '#5365f6',
        borderRadius: 11,
        paddingHorizontal: 18,
        paddingVertical: 11,
        marginTop: 18,
    },

    botaoTentarTexto: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '800',
    },
})

export default styles