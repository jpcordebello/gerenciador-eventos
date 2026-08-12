import '../styles/splash.css'

function SplashScreen() {
    return (
        <div className="splash">
            <div className="splash-logo">
                <span className="splash-icone">P</span>

                <div className="splash-texto">
                    <span>Bem-vindo ao</span>
                    <h1>
                        Petrópolis<strong>Eventos</strong>
                    </h1>
                </div>
            </div>

            <div className="splash-loader">
                <span></span>
            </div>
        </div>
    )
}

export default SplashScreen