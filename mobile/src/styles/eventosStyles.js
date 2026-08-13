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

    marca: {
        color: '#ffffff',
        fontSize: 19,
        fontWeight: '800',
    },

    marcaDestaque: {
        color: '#84edf1',
    },

    subtitulo: {
        color: '#e8ebff',
        fontSize: 11,
        marginTop: 3,
    },

    botaoEntrar: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 11,
        paddingHorizontal: 15,
        paddingVertical: 9,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },

    botaoEntrarTexto: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 13,
    },

    conteudo: {
        padding: 20,
        paddingBottom: 50,
    },

    apresentacao: {
        marginBottom: 20,
    },

    tag: {
        color: '#5365f6',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 8,
    },

    titulo: {
        color: '#111827',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    descricao: {
        color: '#7a8092',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 7,
    },

    busca: {
        height: 52,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e3ed',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    buscaIcone: {
        color: '#5365f6',
        fontSize: 22,
        marginRight: 10,
    },

    buscaInput: {
        flex: 1,
        color: '#1f2937',
        fontSize: 14,
        outlineStyle: 'none',
    },

    categorias: {
        gap: 8,
        paddingRight: 20,
        marginBottom: 17,
    },

    categoriaBotao: {
        borderWidth: 1,
        borderColor: '#dfe2ee',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    categoriaBotaoAtivo: {
        borderColor: '#5365f6',
        backgroundColor: '#5365f6',
    },

    categoriaTexto: {
        color: '#646a7d',
        fontSize: 12,
        fontWeight: '700',
    },

    categoriaTextoAtivo: {
        color: '#ffffff',
    },

    totalEventos: {
        color: '#858b9d',
        fontSize: 12,
        marginBottom: 14,
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 20,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#eceef5',
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
        marginBottom: 15,
    },

    informacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    icone: {
        color: '#5365f6',
        width: 23,
        fontSize: 16,
    },

    informacaoTexto: {
        color: '#555c70',
        fontSize: 13,
        flex: 1,
    },

    endereco: {
        color: '#969bad',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 23,
    },

    botaoCarregarMais: {
        height: 52,
        borderWidth: 1,
        borderColor: '#5365f6',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        backgroundColor: '#ffffff',
    },

    botaoCarregarMaisTexto: {
        color: '#5365f6',
        fontSize: 13,
        fontWeight: '800',
    },

    botaoCarregarMaisIcone: {
        color: '#5365f6',
        fontSize: 17,
        marginLeft: 9,
    },

    estado: {
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 25,
    },

    estadoTexto: {
        color: '#7a8092',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
    },

    erroTitulo: {
        color: '#be123c',
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
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
        fontWeight: '800',
        fontSize: 13,
    },
    visualizacao: {
        flexDirection: 'row',
        backgroundColor: '#e9ecf5',
        borderRadius: 13,
        padding: 4,
        marginBottom: 15,
    },

    visualizacaoBotao: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    visualizacaoBotaoAtivo: {
        backgroundColor: '#ffffff',
    },

    visualizacaoTexto: {
        color: '#7a8092',
        fontSize: 12,
        fontWeight: '700',
    },

    visualizacaoTextoAtivo: {
        color: '#5365f6',
        fontWeight: '800',
    },
    botaoDetalhes: {
        marginTop: 14,
        marginHorizontal: -20,
        marginBottom: -20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 30, 255, 0.08)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    botaoDetalhesTexto: {
        color: '#5365f6',
        fontSize: 12,
        fontWeight: '800',
    },

    botaoDetalhesSeta: {
        color: '#5365f6',
        fontSize: 18,
        fontWeight: '700',
    },
})

export default styles