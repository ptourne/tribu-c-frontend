import TarjetaTarea from "./tarjetaTarea";
import { Recurso } from "../../types";
import { RecursoStats } from "./types";
import Popup from "./popup";
import { useState } from "react";

interface TarjetaRecurso {
    recurso: Recurso;
    recursoStats: RecursoStats;
}
export const TarjetaRecurso: React.FC<TarjetaRecurso> = ({ recurso, recursoStats }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [horas , setHoras] = useState(0);

    // Esto abre el popup
    const togglePopup = () => {
        if (!isOpen)
        setIsOpen(true);
    }

    // Esto es para cargar en la variable horas el input del user
    const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = parseInt(event.target.value)
        if (isNaN(number)) {
          number = 0;
        }
        setHoras(number);
      };

    // Evento del click del botón
    const handleClick = () => {
        //
        // TODO: Aca hay que llamar al endpoint
        //
        alert("Las horas cargadas son: " + horas);
    }

    return (
        <>
            <div onClick={togglePopup} className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-3 mx-3">
                <label className="my-3 ml-3">
                    {recurso.nombre}
                </label>
                {
                    isOpen && <Popup
                        content= {
                        <>
                            <div className="flex-grow-1 d-flex flex-column justify-content-between flex-row ml-6">
                                    <label className="col-md-6 form-label align-items-center">
                                        Horas consumidas en la tarea: { recursoStats.horasConsumidasEnTarea }
                                    </label>
                                    <label className="col-md-6 form-label align-items-center">
                                        Horas consumidas en el proyecto: { recursoStats.horasConsumidasEnProyecto }
                                    </label>
                                    <label className="col-md-6 form-label align-items-center">
                                        Tareas finalizadas en el proyecto: { recursoStats.tareasFinalizadasEnElProyecto }
                                    </label>
                                <div className="flex-grow-1 d-flex flex-row">
                                    <div className="flex-grow-1 d-flex flex-row">
                                        <label>
                                            Horas estimadas: 
                                        </label>
                                        <input
                                            type= "text"
                                            className="d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 ml-9 align-items-center"
                                            id= "horas"
                                            value= { horas }
                                            onChange= {handleCambioDeHoras}
                                            maxLength={4}
                                        />
                                    </div>
                                    <div className="d-flex align-items-end ml-2 mr-3 mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-auto p-2"
                                            onClick={ handleClick }
                                            >
                                                Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    />
                }
            </div>
        </>
    )
}