import React, { useState } from "react";
import { useRouter } from "next/router";
import { ColumnaDia } from "./Components/columnaDia";
import { Tarea } from "./Components/types";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

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
  const [fecha, setDate] = useState(new Date());
  const router = useRouter();
  const { nombreRecurso, apellidoRecurso, legajo } = router.query;
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
          <ColumnaDia nombreDia="Lunes" numeroDia= {diaCorrespondiente(fecha, 1).getDate()} tareas={ getTareas(nombreRecurso, diaCorrespondiente(fecha, 1)) }/>
          <ColumnaDia nombreDia="Martes" numeroDia={diaCorrespondiente(fecha, 2).getDate()} tareas={ getTareas(nombreRecurso, diaCorrespondiente(fecha, 2)) }/>
          <ColumnaDia nombreDia="Miercoles" numeroDia={diaCorrespondiente(fecha, 3).getDate()} tareas={ getTareas(nombreRecurso, diaCorrespondiente(fecha, 3)) }/>
          <ColumnaDia nombreDia="Jueves" numeroDia={diaCorrespondiente(fecha, 4).getDate()} tareas={ getTareas(nombreRecurso, diaCorrespondiente(fecha, 4)) }/>
          <ColumnaDia nombreDia="Viernes" numeroDia={diaCorrespondiente(fecha, 5).getDate()} tareas={ getTareas(nombreRecurso, diaCorrespondiente(fecha, 5)) }/>
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

function getTareas(nombreRecurso: string | string[] | undefined, fecha: Date) {
  if (fecha.getDate() == 28) {
    const tareas: Tarea[] = [
      {
        titulo: "Codear Backend",
        estado: 0,
        horasDedicadas: 0,
      },
      {
        titulo: "Asignar Front",
        estado: 1,
        horasDedicadas: 0,
      },
      {
        titulo: "Tomar Mate",
        estado: 2,
        horasDedicadas: 11,
      }
    ]
    return tareas;
  } else {
    const tareas: Tarea[] = [
      {
        titulo: "Asignar Front",
        estado: 1,
        horasDedicadas: 0,
      },
    ]
    return tareas;
  }
}