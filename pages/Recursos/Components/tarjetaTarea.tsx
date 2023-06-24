export default function TarjetaTarea({nombreTarea}) {
    return (
        <div style={estilos.filas} className="p-2 bd-highlight border-2 border-dark rounded-1 align-middle">
            <p className="text-center align-middle">
              {nombreTarea}
            </p>
        </div>
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
    width: "100%"
  },

  mes: {
    width: "50%"
  },
  filas: {
    margin: "10px"
  }

};
  