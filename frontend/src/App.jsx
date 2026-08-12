import { useEffect, useState } from 'react'

import AppRoutes from './routes/AppRoutes'
import SplashScreen from './components/SplashScreen'

function App() {
  const [iniciando, setIniciando] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIniciando(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (iniciando) {
    return <SplashScreen />
  }

  return <AppRoutes />
}

export default App