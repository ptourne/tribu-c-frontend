import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ColumnaDia } from "./Components/columnaDia";
// import { Tarea } from "./Components/types";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import RECURSOS_URL from "./Components/recursosURL";
import { BloqueDeTrabajo, Proyecto, Tarea } from "../types";
import { SERVER_NAME_PROYECTOS } from "@/environments";
const estilos = {
  calendario: {
    width: "100%"
  },

  mainGrid: {
    gap: "2%",
    width: "98%",
    marginLeft: "1%",
  },
  mes: {
    width: "95%",
    margin: "1%",
    marginBottom: "1%",
  },
};
export default function Calendario() {
  //fecha guarda fecha actual
  const [fecha, setDate] = useState(new Date());
  const router = useRouter();
  const { nombreRecurso, apellidoRecurso, legajo } = router.query;
  const [bloquesDeTrabajo, setBloquesDeTrabajo] = useState<BloqueDeTrabajo[]>([]);
  const [loading, setLoading] = useState(true);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  const getBloquesDeTareas = async () => {
    try {
      const response = await fetch(
        RECURSOS_URL + "bloque_laboral"
      );
      let data = await response.json();
      setBloquesDeTrabajo(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };


  useEffect(() => {
    getBloquesDeTareas();
  }, []);
  const handleLeftClick = () => {
    setDate(diaCorrespondiente(fecha, -6));
  }
  const handleRightClick = () => {
    setDate(diaCorrespondiente(fecha, 7));
  }
  return (
    <>
      <div style={estilos.calendario} className="flex flex-column align-items-center">
        <div style={estilos.mes} className="mes d-flex flex-row justify-content-between align-items-center">
          <div className="display-6">
            {nombreRecurso}
          </div>
          <div className="display-6">
            {numeroAMes(fecha.getMonth())}
          </div>
          <div className="d-flex flex-row">
            <button
              type="button"
              className="btn d-flex"
              onClick={handleLeftClick}
            >
              <BsArrowLeftShort />
            </button>
            <button
              type="button"
              className="btn d-flex"
              onClick={handleRightClick}
            >
              <BsArrowRightShort />
            </button>
        </div>
      </div>
        <div style={estilos.mainGrid} className="diasSemana d-flex">
          <ColumnaDia nombreDia="Lunes" numeroDia= {diaCorrespondiente(fecha, 1).getDate()} bloquesDeTrabajo={ getBloquesDelDia(legajo, diaCorrespondiente(fecha, 1), bloquesDeTrabajo) }/>
          <ColumnaDia nombreDia="Martes" numeroDia={diaCorrespondiente(fecha, 2).getDate()} bloquesDeTrabajo={ getBloquesDelDia(legajo, diaCorrespondiente(fecha, 2), bloquesDeTrabajo) }/>
          <ColumnaDia nombreDia="Miercoles" numeroDia={diaCorrespondiente(fecha, 3).getDate()} bloquesDeTrabajo={ getBloquesDelDia(legajo, diaCorrespondiente(fecha, 3), bloquesDeTrabajo) }/>
          <ColumnaDia nombreDia="Jueves" numeroDia={diaCorrespondiente(fecha, 4).getDate()} bloquesDeTrabajo={ getBloquesDelDia(legajo, diaCorrespondiente(fecha, 4), bloquesDeTrabajo) }/>
          <ColumnaDia nombreDia="Viernes" numeroDia={diaCorrespondiente(fecha, 5).getDate()} bloquesDeTrabajo={ getBloquesDelDia(legajo, diaCorrespondiente(fecha, 5), bloquesDeTrabajo) }/>
        </div>
      </div>
    </>
  );
}

function diaCorrespondiente(fecha: Date, diaSemana: number) {
  var diaActual = new Date(fecha);
  diaActual.setDate(fecha.getDate() + (diaSemana - fecha.getDay()));
  return diaActual
}

function numeroAMes(numero: number) {
    switch (numero) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
    } 
}
// supongo que api te dara un array [fechaTarea, titulo, estado, horasDedicadas]
function getBloquesDelDia(legajo: string | number | string[] | undefined, fecha: Date, bloques: BloqueDeTrabajo[]) {
  let bloques_filtrados = new Array<BloqueDeTrabajo>();
  bloques.forEach((bloque) => {
    const fechaBloque = new Date(bloque.fecha);
    if (bloque.legajo.toString() === legajo && 
        fecha.getDate() == fechaBloque.getDate() && 
        fecha.getMonth() == fechaBloque.getMonth() && 
        fecha.getFullYear() == fechaBloque.getFullYear()) {
      
          bloques_filtrados.push(bloque);
    }
  })
  return bloques_filtrados;
}

function asignarTareaABloque(bloques: Array<BloqueDeTrabajo>, tareas: Map<number, Map<string, Tarea>>) {
  bloques.forEach((bloque) => {
    let diccionarioDeProyectos = tareas.get(bloque.codProyectoDeLaTarea);
    if (diccionarioDeProyectos === undefined){
      bloque.tareaAsociada = null;
      return;
    }
    let tareaAsociada = diccionarioDeProyectos.get(bloque.codTarea.toString())
    if (tareaAsociada === undefined) {
      bloque.tareaAsociada = null;
      return;
    }
    bloque.tareaAsociada = tareaAsociada;
  });
  return bloques;
}