import TarjetaTarea from "./tarjetaTarea";

export default function ColumnaDia({ nombreDia, numeroDia}) {
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
                    <TarjetaTarea nombreTarea="Codear Backend"/>
                    <TarjetaTarea nombreTarea="Levantar Docker"/>
                    <TarjetaTarea nombreTarea="Terminar Front"/>
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
  