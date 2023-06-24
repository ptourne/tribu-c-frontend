import TarjetaTarea from "./tarjetaTarea";

export default function ColumnaDia({ nombreDia, numeroDia}) {
    return (
        <>
            <div className="flex-column diasSemana-contenido" style={estilos.columnas}>
                <div style={estilos.diasSemana} className="diasSemana flex justify-content-evenly">
                    <h5> {nombreDia}</h5>
                </div>
                <div className="diasSemana-contenido flex justify-content-evenly" style={estilos.columnas}>
                    <h5>{numeroDia}</h5>
                </div>
                <div className="d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 justify-content-evenly" style={estilos.columnas}>
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

  calendario: {
    width: "100%"
  },

  mainGrid: {
    gap: "2%",
    height: "500px"
  },

  columnas: {
    width: "100%",
  },

  mes: {
    width: "50%"
  },
  filas: {
    margin: "10px"
  }

};
  