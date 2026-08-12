import { Route, Routes } from 'react-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import MeusEventos from '../pages/MeusEventos'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/meus-eventos" element={<MeusEventos />} />
        </Routes>
    )
}

export default AppRoutes