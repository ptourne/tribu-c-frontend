import { BloqueDeTrabajo, Recurso, Tarea } from "../../types";
// import { RecursoStats } from "./types";
import Popup from "./popup";
import { useState } from "react";
import axios from "axios";
import RECURSOS_URL from "./recursosURL";
import { toast } from "react-toastify";

interface TarjetaRecurso {
    recurso: Recurso;
    recursoStats: RecursoStats;
    tarea: Tarea;
}
export const TarjetaRecurso: React.FC<TarjetaRecurso> = ({ recurso, recursoStats, tarea }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [horas , setHoras] = useState(0);
    const [bloque, setBloque] = useState<BloqueDeTrabajo | undefined>(undefined);
    console.log(tarea);
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
        console.log("TAREA: " + tarea);
        console.log("ID PROYECT: " + tarea.id_project);
        const bloque = {
            codProyectoDeLaTarea: parseInt(tarea.id_project),
            codTarea: parseInt(tarea.id_tarea),
            legajo: recurso.legajo,
            horasDelBloque: horas,
            fecha: new Date(), // Agregar bloque laboral
        };
        axios
    .post(RECURSOS_URL + "bloque_laboral", bloque)
    .then(() => {
      toast.success("Bloque asignado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    })
    .catch((e) => {
      toast.error(
        e.response?.data?.msg
          ? "Hubo un error al crear el bloque: " + e.response?.data?.msg
          : "Hubo un error al crear el bloque",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    });
    }
    return (
        <>
            <div onClick={togglePopup} className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-3 mx-3">
                <label className="my-3 ml-3">
                    {recurso.Nombre}
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
};