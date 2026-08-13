import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashScreen from './src/screens/SplashScreen'
import EventosScreen from './src/screens/EventosScreen'
import LoginScreen from './src/screens/LoginScreen'
import MeusEventosScreen from './src/screens/MeusEventosScreen'
import CadastroScreen from './src/screens/CadastroScreen'


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Eventos"
          component={EventosScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
        />

        <Stack.Screen
          name="MeusEventos"
          component={MeusEventosScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}