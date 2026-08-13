import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#eceef5',
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },

    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    botaoMes: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#eef0ff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoMesTexto: {
        color: '#5365f6',
        fontSize: 25,
        fontWeight: '700',
        marginTop: -3,
    },

    mesTitulo: {
        color: '#171c2b',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
    },

    anoTexto: {
        color: '#969bad',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 2,
    },

    diasSemana: {
        flexDirection: 'row',
        marginBottom: 8,
    },

    diaSemana: {
        width: '14.285%',
        textAlign: 'center',
        color: '#8a90a2',
        fontSize: 11,
        fontWeight: '800',
    },

    grade: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    dia: {
        width: '14.285%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },

    diaSelecionado: {
        backgroundColor: '#5365f6',
    },

    diaTexto: {
        color: '#30364a',
        fontSize: 13,
        fontWeight: '700',
    },

    diaTextoSelecionado: {
        color: '#ffffff',
    },

    marcador: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#5365f6',
        marginTop: 4,
    },

    marcadorSelecionado: {
        backgroundColor: '#84edf1',
    },

    eventosDia: {
        borderTopWidth: 1,
        borderTopColor: '#eceef5',
        marginTop: 17,
        paddingTop: 17,
    },

    eventosDiaTitulo: {
        color: '#30364a',
        fontSize: 14,
        fontWeight: '800',
        marginBottom: 12,
    },

    semEvento: {
        color: '#8a90a2',
        fontSize: 13,
    },

    evento: {
        backgroundColor: '#f7f8fc',
        borderRadius: 13,
        padding: 13,
        marginBottom: 9,
    },

    eventoCategoria: {
        color: '#5365f6',
        fontSize: 9,
        fontWeight: '800',
        marginBottom: 5,
    },

    eventoTitulo: {
        color: '#171c2b',
        fontSize: 14,
        fontWeight: '800',
    },

    eventoLocal: {
        color: '#73798c',
        fontSize: 12,
        marginTop: 6,
    },
    botaoDetalhes: {
        marginTop: 12,
        marginHorizontal: -13,
        marginBottom: -13,
        paddingHorizontal: 13,
        paddingVertical: 11,
        backgroundColor: 'rgba(83, 101, 246, 0.08)',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
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