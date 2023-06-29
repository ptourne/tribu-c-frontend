import { BloqueDeTrabajo, Recurso, Tarea } from "../../types";
// import { RecursoStats } from "./types";
import Popup from "./popup";
import { useEffect, useState } from "react";
import axios from "axios";
import RECURSOS_URL from "./recursosURL";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { SERVER_NAME_PROYECTOS } from "@/environments";
import { RiContactsBookLine } from "react-icons/ri";

interface TarjetaRecurso {
    recurso: Recurso;
    tareaActual: Tarea;
}
export const TarjetaRecurso: React.FC<TarjetaRecurso> = ({ recurso, tareaActual }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [horas , setHoras] = useState(0);
    const [bloque, setBloque] = useState<BloqueDeTrabajo | undefined>(undefined);
    const [fechaDelBloque, setStartDate] = useState(new Date());
    const [horasDedicadasATarea, sethorasDedicadasATarea] = useState(0);
    const [horasDedicadasAProyecto, sethorasDedicadasAProyecto] = useState(0);
    // Esto abre el popup
    const togglePopup = () => {
        if (!isOpen)
        setIsOpen(true);
    }
    const closePopup = () => {
        if (isOpen)
        setIsOpen(false);
    }

    // Esto es para cargar en la variable horas el input del user
    const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
        let number = parseInt(event.target.value)
        if (isNaN(number)) {
          number = 0;
        }
        setHoras(number);
      };


    const handleCambioDeFecha = (date: Date) => {
        setStartDate(date);
    }
    // Evento del click del botón
    const handleClick = () => {
        const bloque = {
            codProyectoDeLaTarea: parseInt(tareaActual.id_project),
            codTarea: parseInt(tareaActual.id_tarea),
            legajo: recurso.legajo,
            horasDelBloque: horas,
            fecha: fechaDelBloque, // Agregar bloque laboral
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


    const getTareasDeProyecto = async () => {
        try {
        const response = await fetch(
            RECURSOS_URL + "bloque_laboral"
            );
          response.json().then((data: Array<BloqueDeTrabajo>) => {
            // console.log("Data: " + data);
            // console.log("Data[0]:" + data[0]);
            let horasTotalesEnTarea = 0;
            let horasTotalesEnProyecto = 0;
            console.log("Recurso: L:" + recurso.legajo);
            console.log("Tarea actual: P:" + tareaActual.id_proyecto + " T:" + tareaActual.id_tarea);
            data.forEach((bloqueDeTrabajo: BloqueDeTrabajo) => {
                // No contabilizar horas futuras
                // console.log(tareaActual.)
                console.log("Bloque de trabajo: P:" + bloqueDeTrabajo.codProyectoDeLaTarea + " T:" + bloqueDeTrabajo.codTarea);
                if (recurso.legajo == bloqueDeTrabajo.legajo && bloqueDeTrabajo.codTarea.toString() == tareaActual.id_tarea && bloqueDeTrabajo.codProyectoDeLaTarea.toString() == tareaActual.id_proyecto) {
                    horasTotalesEnTarea += bloqueDeTrabajo.horasDelBloque;
                } else if (recurso.legajo == bloqueDeTrabajo.legajo && bloqueDeTrabajo.codProyectoDeLaTarea.toString() == tareaActual.id_proyecto) {
                    horasTotalesEnProyecto += bloqueDeTrabajo.horasDelBloque;
                }
            })
            sethorasDedicadasATarea(horasTotalesEnTarea);
            sethorasDedicadasAProyecto(horasTotalesEnProyecto);
          });
        } catch (error) {
          console.error("Error fetching ticket:", error);
        }
      };
    useEffect(() => {
        getTareasDeProyecto();
    }, []);

    
    return (
        <>
            <div onClick={togglePopup} className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-3 mx-3">
                <div className="d-flex justify-content-between mr-6">
                <label className="my-3 ml-3">
                    {recurso.Nombre}
                </label>
                <button onClick={closePopup}>
                    X
                </button>
                </div>
                {
                    isOpen && <Popup
                        content= {
                        <>
                            <div className="flex-grow-1 d-flex flex-column justify-content-between flex-row ml-6">
                                    <label className="col-md-6 form-label align-items-center">
                                        Horas consumidas en la tarea: { horasDedicadasATarea }
                                    </label>
                                    <label className="col-md-6 form-label align-items-center">
                                        Horas consumidas en el proyecto: { horasDedicadasAProyecto }
                                    </label>
                                    <label className="col-md-6 form-label align-items-center">
                                        Tareas finalizadas en el proyecto: { 10 }
                                    </label>
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
                                <div className="flex-grow-1 d-flex flex-row">
                                    <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                                        <label htmlFor="startDate" className="col-md-6 form-label">
                                        Dia
                                        </label>
                                        <div className="col-md-6">
                                        <DatePicker
                                            selected={fechaDelBloque}
                                            onChange={handleCambioDeFecha}
                                            className="form-control border-0 border-bottom rounded-0 p-0"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Seleccione una fecha"
                                        />
                                        </div>
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