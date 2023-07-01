import { BloqueDeTrabajo, Tarea } from "@/components/types";
import { TarjetaTarea } from "./tarjetaTarea";
import { useEffect } from "react";

interface ColumnaDia {
    nombreDia: string;
    numeroDia: number;
    bloquesDeTrabajo: Array<BloqueDeTrabajo>;
    mapaDeTareas:Map<number, Tarea>;

}

export const ColumnaDia: React.FC<ColumnaDia> = ({ nombreDia, numeroDia, bloquesDeTrabajo, mapaDeTareas }) => {
    return (
        <>
            <div className="flex-column diasSemana-contenido" style={estilos.dia}>
                <div style={estilos.diasSemana} className="diasSemana flex justify-content-evenly">
                    <h5> {nombreDia}</h5>
                </div>
                <div className="diasSemana-contenido flex justify-content-evenly" style={estilos.nroDia}>
                    <h5>{numeroDia}</h5>
                </div>
                <div className="d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3" style={estilos.columnas}>
                    {
                        bloquesDeTrabajo.map(bloqueDeTrabajo =>
                            <TarjetaTarea bloqueDeTrabajo={bloqueDeTrabajo} key={bloqueDeTrabajo.codBloqueLaboral} tareaAsociada={parseTask(mapaDeTareas.get(bloqueDeTrabajo.codBloqueLaboral))}/>
                            )
                    }
                </div>
            </div>
        </>
    )
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
function parseTask(task: Tarea | undefined): Tarea {
  if (task == undefined) {
    return ({
      id_tarea: "",
      id_proyecto: "",
      titulo: "",
      descripcion: "",
      tiempo_estimado_finalizacion: 0,
      horas_acumuladas: 0,
      estado: 0,
      legajo_responsable: "",
    })
  } else {
    return task
  }
}