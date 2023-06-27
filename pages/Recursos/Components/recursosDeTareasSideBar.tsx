import TarjetaTarea from "./tarjetaTarea";
import { Tarea } from "../../types";
import { TarjetaRecurso } from "./tarjetaRecurso";

interface RecursosDeTareasSideBar {
    tarea: Tarea;
}

export const RecursosDeTareasSideBar: React.FC<RecursosDeTareasSideBar> = ({ tarea }) => {
    return (
        <>
            <form className="d-flex flex-col">
                <div className="d-flex justify-content-between align-items-center flex-row mt-1 mb-2">
                    <div className="w-10 fs-2 text-body-secondary flex-shrink-0 ml-2 mr-2">
                        {tarea && tarea.id_tarea}
                    </div>
                    <div className="form-control border-0 border-bottom rounded-0 p-0 fs-2">
                        {tarea && tarea.titulo}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-row mt-1 mb-2">
                    <p>Recursos</p>
                    <p>Disponibilidad semanal</p>
                </div>
                <div>
                    {
                        getRecursos().map(recurso =>
                            <TarjetaRecurso recurso={recurso}/>
                            )
                    }
                </div>
            </form>
        </>
    )
}

function getRecursos() {
    return ([
        {
            nombre: "Maria",
            apellido: "De La Rosa",
            legajo: 234, // March 1, 2023
        
        },
        {
            nombre: "Juan",
            apellido: "Perez",
            legajo: 556, // March 1, 2023
        },
            
        ] )   
}

const estilos = {
  diasSemana: {
    backgroundColor: "white",
  },
  dia: {
    width: "100%",
  },
  nroDia: {
    width: "100%",
  },
  columnas: {
    width: "100%",
    minHeight: "200%",
  },
  mes: {
    width: "50%"
  },
  filas: {
    margin: "10px"
  }

};