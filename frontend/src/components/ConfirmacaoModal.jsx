import '../styles/confirmacao-modal.css'

function ConfirmacaoModal({
    evento,
    excluindo,
    onCancelar,
    onConfirmar,
}) {
    return (
        <div className="confirmacao-overlay">
            <section
                className="confirmacao-modal"
                role="dialog"
                aria-modal="true"
            >
                <div className="confirmacao-icone">
                    <svg viewBox="0 0 24 24">
                        <path d="M4 7H20" />
                        <path d="M9 7V4H15V7" />
                        <path d="M6 7L7 20H17L18 7" />
                        <path d="M10 11V16M14 11V16" />
                    </svg>
                </div>

                <span className="confirmacao-tag">
                    Excluir evento
                </span>

                <h2>Tem certeza?</h2>

                <p>
                    O evento <strong>{evento.nome}</strong> será
                    removido permanentemente da agenda.
                </p>

                <div className="confirmacao-acoes">
                    <button
                        className="confirmacao-cancelar"
                        type="button"
                        onClick={onCancelar}
                        disabled={excluindo}
                    >
                        Cancelar
                    </button>

                    <button
                        className="confirmacao-excluir"
                        type="button"
                        onClick={onConfirmar}
                        disabled={excluindo}
                    >
                        {excluindo
                            ? 'Excluindo...'
                            : 'Excluir evento'}
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ConfirmacaoModal