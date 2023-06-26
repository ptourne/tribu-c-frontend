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
  filas: {
    margin: "10px"
  }
};
  