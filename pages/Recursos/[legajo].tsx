import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ColumnaDia } from "@/components/recursos/columnaDia";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { BloqueDeTrabajo, Proyecto, Tarea } from "../../components/types";
import { RECURSOS_URL, SERVER_NAME_PROYECTOS } from "@/environments";
import axios from "axios";
import { CircularProgress } from "@mui/material";
const estilos = {
  calendario: {
    width: "100%",
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
  const [proyectos, setProyetos] = useState<Proyecto[]>([])
  const [bloquesDeTrabajo, setBloquesDeTrabajo] = useState<BloqueDeTrabajo[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [tareasMap, setTareasMap] = useState<Map<number, Map<number, Tarea>>>(new Map<number, Map<number, Tarea>>)
  const [tareaCorrespondienteABloqueMap, setTareaCorrespondienteABloqueMap] = useState<Map<number, Tarea>>(new Map<number, Tarea>);
  
  const getProyectos = async () => {
    axios
      .get(SERVER_NAME_PROYECTOS + "projects")
      .then((data) => {
        if (data.data.ok) {
          let cantidad = 0;
          data.data.msg.forEach((project: Proyecto) => {
            cantidad += 1;
          });
          setProyetos(data.data.msg);
        }
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          console.log(err.response.data.msg);
        }
      });
  };
  
  const getBloquesDeTareas = async () => {
    try {
      const response = await fetch(RECURSOS_URL + "bloque_laboral");
      let data = await response.json();
      setBloquesDeTrabajo(data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  const getTareas = async () => {
    try {
      let proyectosMap = new Map<number, Map<number, Tarea>>();
      fetchProyectos(proyectos).then((responses) => Promise.all(responses.map(response => {
        if(response.ok) return response.json();
      })))
      .then((data) => {
        data.forEach(response => {
          let proyecto_id = 0;
          let map = new Map<number, Tarea>();
          response.msg.forEach((tarea: Tarea) => {
            if (proyecto_id == 0) {
              proyecto_id = parse(tarea.id_proyecto);
            }
            map.set(parse(tarea.id_tarea), tarea);
          });
        proyectosMap.set(proyecto_id, map);
      })
      setTareasMap(proyectosMap);
    })
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  }
  const getTareaCorrespondienteABloqueMap = () => {
    let map = new Map<number, Tarea>();
    for (let bloque of bloquesDeTrabajo) {
      let proyecto = tareasMap.get(bloque.codProyectoDeLaTarea);
      let tarea = proyecto?.get(bloque.codTarea);
      map.set(bloque.codBloqueLaboral, parseTask(tarea));
    }
    setTareaCorrespondienteABloqueMap(map);
  };
  useEffect(() => {
    getProyectos();
  }, []);
  useEffect(() => {
    if (proyectos.length > 0) {
      getBloquesDeTareas();
    }
  }, [proyectos]);
  useEffect(() => {
    if (bloquesDeTrabajo.length > 0) {
      getTareas();
    }
  }, [bloquesDeTrabajo]);
  useEffect(() => {
    if (tareasMap.size == proyectos.length && tareasMap.size != 0) {
      getTareaCorrespondienteABloqueMap();
      setLoading(false);
    }
  }, [tareasMap]);
  const handleLeftClick = () => {
    setDate(diaCorrespondiente(fecha, -6));
  };
  const handleRightClick = () => {
    setDate(diaCorrespondiente(fecha, 7));
  };
  return (
    <>
    {loading ? (
            <div className="d-flex justify-content-center align-items-center flex-column mt-8">
              <CircularProgress></CircularProgress>
              <p className="mt-3">Cargando Recursos</p>
            </div>
          ) : (
            <div
        style={estilos.calendario}
        className="flex flex-column align-items-center"
      >
        <div
          style={estilos.mes}
          className="mes d-flex flex-row justify-content-between align-items-center"
        >
          <div className="display-6">{nombreRecurso}</div>
          <div className="display-6">{numeroAMes(fecha.getMonth())}</div>
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
          <ColumnaDia
            nombreDia="Lunes"
            numeroDia={diaCorrespondiente(fecha, 1).getDate()}
            bloquesDeTrabajo={getBloquesDelDia(
              legajo,
              diaCorrespondiente(fecha, 1),
              bloquesDeTrabajo
            )}
            mapaDeTareas= {tareaCorrespondienteABloqueMap}
          />
          <ColumnaDia
            nombreDia="Martes"
            numeroDia={diaCorrespondiente(fecha, 2).getDate()}
            bloquesDeTrabajo={getBloquesDelDia(
              legajo,
              diaCorrespondiente(fecha, 2),
              bloquesDeTrabajo
            )}
            mapaDeTareas= {tareaCorrespondienteABloqueMap}
          />
          <ColumnaDia
            nombreDia="Miercoles"
            numeroDia={diaCorrespondiente(fecha, 3).getDate()}
            bloquesDeTrabajo={getBloquesDelDia(
              legajo,
              diaCorrespondiente(fecha, 3),
              bloquesDeTrabajo
            )}
            mapaDeTareas= {tareaCorrespondienteABloqueMap}
          />
          <ColumnaDia
            nombreDia="Jueves"
            numeroDia={diaCorrespondiente(fecha, 4).getDate()}
            bloquesDeTrabajo={getBloquesDelDia(
              legajo,
              diaCorrespondiente(fecha, 4),
              bloquesDeTrabajo
            )}
            mapaDeTareas= {tareaCorrespondienteABloqueMap}
          />
          <ColumnaDia
            nombreDia="Viernes"
            numeroDia={diaCorrespondiente(fecha, 5).getDate()}
            bloquesDeTrabajo={getBloquesDelDia(
              legajo,
              diaCorrespondiente(fecha, 5),
              bloquesDeTrabajo
            )}
            mapaDeTareas= {tareaCorrespondienteABloqueMap}
          />
        </div>
      </div>
          )
          }
    </>
  );
}

function diaCorrespondiente(fecha: Date, diaSemana: number) {
  var diaActual = new Date(fecha);
  diaActual.setDate(fecha.getDate() + (diaSemana - fecha.getDay()));
  return diaActual;
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
function getBloquesDelDia(
  legajo: string | number | string[] | undefined,
  fecha: Date,
  bloques: BloqueDeTrabajo[]
) {
  let bloques_filtrados = new Array<BloqueDeTrabajo>();
  bloques.forEach((bloque) => {
    const fechaBloque = new Date(bloque.fecha);
    if (
      bloque.legajo.toString() === legajo &&
      fecha.getDate() == fechaBloque.getDate() &&
      fecha.getMonth() == fechaBloque.getMonth() &&
      fecha.getFullYear() == fechaBloque.getFullYear()
    ) {
      bloques_filtrados.push(bloque);
    }
  });
  return bloques_filtrados;
}
function parse(id: string | undefined): number {
  if (id == undefined){
    return 0;
  } else {
    return parseInt(id)
  }
}
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

function fetchProyectos(proyectos: Proyecto[]) {
  let responses = [];
  for(let proyecto of proyectos) {
    let response = fetch(`${SERVER_NAME_PROYECTOS}projects/${proyecto.codigo}/tasks`);
    responses.push(response);
  } 
  return Promise.all(responses);
}
