import { Recurso, Tarea } from "../../types";
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
                <div className="d-flex justify-content-between align-items-center flex-row mt-1 mb-2 mx-4">
                    <p>Recursos</p>
                    <p>Disponibilidad semanal</p>
                </div>
                <div>
                    {
                        getRecursos().map(recurso =>
                            <TarjetaRecurso recurso={recurso} recursoStats= {getEstadisticasRecursos(recurso)}/>
                            )
                    }
                </div>
            </form>
        </>
    )
}


// Esta función obtiene los recursos (Se deben obtener llamando a endpoints)
function getRecursos() {
  //
  // TODO: Acá se deben obtener vía endpoints
  //

    return ([
        {
            nombre: "Maria",
            apellido: "De La Rosa",
            legajo: 234,
        
        },
        {
            nombre: "Juan",
            apellido: "Perez",
            legajo: 556,
        },
            
  ] )   
}

// Esta función obtiene las estadisticas de los recursos (Se deben obtener llamando a endpoints)
function getEstadisticasRecursos(recurso: Recurso) {
  //
  // TODO: Acá se deben obtener vía endpoints
  //

  // Todo esto de acá es momentaneo. Me pareció que tener una función a la que se le pase un recurso y esta devuelva la info del recurso es lo más sencillo. 
  if (recurso.nombre == "Maria") {
    return ({
      horasConsumidasEnTarea: 10,
      horasConsumidasEnProyecto: 150,
      tareasFinalizadasEnElProyecto: 15,
    })
  } else {
    return ({
      horasConsumidasEnTarea: 0,
      horasConsumidasEnProyecto: 75,
      tareasFinalizadasEnElProyecto: 8,
    })
  }
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