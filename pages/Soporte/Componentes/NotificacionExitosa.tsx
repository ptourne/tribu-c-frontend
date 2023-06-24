interface notificacionProp {
  onClose: () => void;
}
// Mismo esqueleto lo que recibimos lo guardamos en una interface y lugo en {} el argumento.
export const NotificacionExitosa: React.FC<notificacionProp> = ({
  onClose,
}) => {
  return (
    <>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <p>
          Agrego un poco de texto al boton jejejej hace click en la X para
          cerrar
        </p>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};
