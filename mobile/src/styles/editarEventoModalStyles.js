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
        maxWidth: 500,
        maxHeight: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 22,
        overflow: 'hidden',
    },

    conteudo: {
        padding: 22,
        paddingBottom: 26,
    },

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    cabecalhoTexto: {
        flex: 1,
        paddingRight: 15,
    },

    tag: {
        color: '#5365f6',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 5,
    },

    titulo: {
        color: '#171c2b',
        fontSize: 22,
        lineHeight: 27,
        fontWeight: '800',
    },

    aviso: {
        color: '#858b9d',
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 22,
    },

    fechar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f2f8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fecharTexto: {
        color: '#62687a',
        fontSize: 23,
        lineHeight: 25,
    },

    erro: {
        backgroundColor: '#fff1f2',
        borderRadius: 11,
        padding: 12,
        marginBottom: 18,
    },

    erroTexto: {
        color: '#be123c',
        fontSize: 13,
    },

    label: {
        color: '#30364a',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 7,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e3ed',
        borderRadius: 12,
        backgroundColor: '#fafbfe',
        paddingHorizontal: 14,
        color: '#1f2937',
        fontSize: 14,
        marginBottom: 16,
    },

    categorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 22,
    },

    categoria: {
        borderWidth: 1,
        borderColor: '#dfe2ee',
        borderRadius: 20,
        paddingHorizontal: 13,
        paddingVertical: 8,
    },

    categoriaAtiva: {
        backgroundColor: '#5365f6',
        borderColor: '#5365f6',
    },

    categoriaTexto: {
        color: '#676d80',
        fontSize: 12,
        fontWeight: '700',
    },

    categoriaTextoAtivo: {
        color: '#ffffff',
    },

    botaoSalvar: {
        height: 52,
        backgroundColor: '#5365f6',
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoSalvarTexto: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '800',
    },

    botaoDesabilitado: {
        opacity: 0.6,
    },

    botaoCancelar: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    botaoCancelarTexto: {
        color: '#777d90',
        fontSize: 13,
        fontWeight: '700',
    },
})

export default styles