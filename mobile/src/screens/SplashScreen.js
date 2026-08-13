import { useEffect, useRef } from 'react'
import {
    Animated,
    Platform,
    Text,
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import styles from '../styles/splashStyles'

export default function SplashScreen({ navigation }) {
    const escala = useRef(
        new Animated.Value(0.85),
    ).current

    const opacidade = useRef(
        new Animated.Value(0),
    ).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacidade, {
                toValue: 1,
                duration: 500,
                useNativeDriver:
                    Platform.OS !== 'web',
            }),

            Animated.spring(escala, {
                toValue: 1,
                friction: 5,
                tension: 60,
                useNativeDriver:
                    Platform.OS !== 'web',
            }),
        ]).start()

        const timer = setTimeout(() => {
            navigation.replace('Eventos')
        }, 1400)

        return () => clearTimeout(timer)
    }, [navigation, escala, opacidade])

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <Animated.View
                style={[
                    styles.conteudo,
                    {
                        opacity: opacidade,
                        transform: [
                            {
                                scale: escala,
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.logo}>
                    <Text style={styles.logoTexto}>
                        P
                    </Text>
                </View>

                <Text style={styles.marca}>
                    Petrópolis
                    <Text style={styles.destaque}>
                        Eventos
                    </Text>
                </Text>

                <Text style={styles.subtitulo}>
                    Descubra o que está acontecendo
                    na cidade.
                </Text>
            </Animated.View>
        </View>
    )
}