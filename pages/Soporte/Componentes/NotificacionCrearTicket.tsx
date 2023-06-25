//Accesorio especial en el cual todos los componentes tienen acceso.
//rafce para crear rapido todo cabron.
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";

interface Props {
  onClose: () => void; //funcion que devuelve void
  tipo: string;
}
//Si del otro ponene mas etiquetas html por ej span
// es mas completo por lo tanto usamos ReactNode en lugar del stringDDDD
export const NotificacionCrearTicket: React.FC<Props> = ({ onClose, tipo }) => {
  if (tipo === "OK") {
    return (
      <div id="NotificacionCrearTicket">
        <span> Ticket creado de forma correcta </span>
        <p>
          <RiCheckboxCircleLine size={140} />
        </p>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  } else {
    return (
      <div id="NotificacionCrearTicket">
        <span> ERROR ! Falta ingresar datos por favor ingreselos </span>
        <p>
          <RiCloseCircleLine size={140} />
        </p>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  }
};
