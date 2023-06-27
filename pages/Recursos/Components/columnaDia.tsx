import TarjetaTarea from "./tarjetaTarea";
import { Tarea } from "../tarea";

interface ColumnaDia {
    nombreDia: string;
    numeroDia: number;
    tareas: Array<Tarea>;
}

export const ColumnaDia: React.FC<ColumnaDia> = ({ nombreDia, numeroDia, tareas }) => {
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
                        tareas.map(tarea =>
                            <TarjetaTarea nombreTarea={tarea.titulo} estadoTarea={tarea.estado}/>
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