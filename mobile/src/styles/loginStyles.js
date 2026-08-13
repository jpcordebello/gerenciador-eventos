import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    pagina: {
        flex: 1,
        backgroundColor: '#f4f6fb',
    },

    scroll: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 40,
    },

    apresentacao: {
        width: '100%',
        backgroundColor: '#4f63f6',
        paddingTop: 54,
        paddingHorizontal: 26,
        paddingBottom: 58,
    },

    logo: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 12,
    },

    logoTexto: {
        color: '#5265f6',
        fontSize: 20,
        fontWeight: '800',
    },

    marca: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 34,
    },

    marcaDestaque: {
        color: '#82e9ef',
    },

    tag: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.14)',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom: 14,
    },

    tagTexto: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '800',
    },

    tituloPrincipal: {
        color: '#ffffff',
        fontSize: 36,
        lineHeight: 40,
        fontWeight: '800',
        letterSpacing: -1,
    },

    tituloDestaque: {
        color: '#84edf1',
    },

    descricao: {
        color: '#e8ebff',
        marginTop: 16,
        fontSize: 15,
        lineHeight: 23,
        maxWidth: 420,
    },

    card: {
        width: '90%',
        maxWidth: 480,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginTop: -26,

        shadowColor: '#111827',
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 8,
        },

        elevation: 5,
    },

    bemVindo: {
        color: '#5365f6',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 7,
    },

    titulo: {
        color: '#111827',
        fontSize: 30,
        fontWeight: '800',
    },

    subtitulo: {
        color: '#777d90',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 6,
        marginBottom: 25,
    },

    campo: {
        marginBottom: 17,
    },

    label: {
        color: '#30364a',
        fontWeight: '700',
        fontSize: 13,
        marginBottom: 8,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#e0e3ed',
        borderRadius: 13,
        paddingHorizontal: 15,
        color: '#1f2937',
        fontSize: 15,
        backgroundColor: '#fafbfe',
    },

    lembrar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 22,
    },

    checkbox: {
        width: 21,
        height: 21,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#cbd0dc',
        marginRight: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxAtivo: {
        backgroundColor: '#5365f6',
        borderColor: '#5365f6',
    },

    checkboxMarca: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '800',
    },

    lembrarTexto: {
        color: '#606679',
        fontSize: 13,
    },

    botao: {
        height: 54,
        borderRadius: 14,
        backgroundColor: '#5365f6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoPressionado: {
        opacity: 0.86,
    },

    botaoTexto: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 15,
    },

    botaoSeta: {
        color: '#ffffff',
        fontSize: 21,
        marginLeft: 10,
        marginTop: -2,
    },

    cadastro: {
        marginTop: 22,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 5,
    },

    cadastroTexto: {
        color: '#808597',
        fontSize: 13,
    },

    cadastroLink: {
        color: '#5365f6',
        fontWeight: '800',
        fontSize: 13,
    },
    erro: {
    marginTop: 12,
    marginBottom: 4,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff1f1',
    color: '#b42318',
    fontSize: 13,
    fontWeight: '600',
},
})

export default styles