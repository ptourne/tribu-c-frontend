import { useEffect, useState } from "react";
import { BloqueDeTrabajo, Recurso, RecursoStats, Tarea } from "@/components/types";
import { TarjetaRecurso } from "./tarjetaRecurso";
import { CircularProgress } from "@mui/material";
import { RECURSOS_URL } from "@/environments";
import { createSourceMapSource } from "typescript";
import { map } from "cheerio/lib/api/traversing";

interface RecursosDeTareasSideBar {
  tarea: Tarea | undefined;
  project_id: string;
}

export const RecursosDeTareasSideBar: React.FC<RecursosDeTareasSideBar> = ({
  tarea,
  project_id,
}) => {
  let idTarea: number;
  if (tarea) {
    tarea.id_proyecto = project_id;
  }
  if ((tarea) && tarea.id_tarea == undefined) {
    idTarea = 0
  } else if (tarea && tarea.id_tarea != undefined) {
    idTarea = parseInt(tarea.id_tarea);
  } else {
    idTarea = 0;
  }
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  // const [recursosFetched, setRecursosFetched] = useState(false)
  const [loading, setLoading] = useState(true);
  const [bloques, setBloques] = useState<BloqueDeTrabajo[]>([]);
  const [recursosMap, setRecursosMap] = useState<Map<number, RecursoStats>>(new Map<number, RecursoStats>());
  const [bloqueDeTrabajoResponse, setBloqueDeTrabajoResponse] = useState(false);
  const getRecursos = async () => {
    try {
      const response = await fetch(RECURSOS_URL + "recurso");
      const data = await response.json();
      setRecursos(data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  const getBloquesLaborales = async () => {
    try {
      const response = await fetch(RECURSOS_URL + "bloque_laboral");
      response.json().then((data: Array<BloqueDeTrabajo>) => {
        setBloques(data);
        setBloqueDeTrabajoResponse(true);
      });
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const getRecursosMap = () => {
    let map = new Map<number, RecursoStats>();
    for (let recurso of recursos) {
      const stats = getRecursosStats(bloques, recurso.legajo, parseInt(project_id), idTarea);
      map.set(recurso.legajo, stats);
    }
    setRecursosMap(map);
  }
  useEffect(() => {
    if (tarea != undefined) {
      getRecursos();
    }
  }, [tarea])

  useEffect(() => {
    if (recursos.length > 0) {
      getBloquesLaborales();
      getRecursosMap();
    }
  }, [recursos])

  useEffect(() => {
    if (bloqueDeTrabajoResponse) {
      getRecursosMap();
      setLoading(false);
    }
  }, [bloqueDeTrabajoResponse])


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
          {loading ? (
            <>
              <CircularProgress></CircularProgress>
              <p className="mt-3">Cargando Recursos</p>
            </>
          ) : (
            recursos.map(
              (recurso: Recurso) =>
                tarea && (
                  <TarjetaRecurso
                    recurso={recurso}
                    tareaActual={tarea}
                    key={recurso.legajo}
                    stats= { getStats(recurso.legajo, recursosMap) }
                  />
                )
            )
          )
          }
        </div>
      </form>
    </>
  );
};
function getRecursosStats(bloques: Array<BloqueDeTrabajo>, recurso: number, id_proyecto: number, id_tarea: number): RecursoStats {
  let horasInvertidasEnTarea = 0;
  let horasInvertidasEnProyecto = 0;
  let horasDisponiblesEnSemana = 40;
  for (let bloque of bloques) {
    if (bloque.legajo != recurso)
      continue;

    if (estaEnSemanaActual(bloque.fecha)) {
      horasDisponiblesEnSemana -= bloque.horasDelBloque;
    }
    if (bloque.codProyectoDeLaTarea != id_proyecto)
      continue;
    
    horasInvertidasEnProyecto += bloque.horasDelBloque;
    if (bloque.codTarea != id_tarea)
      continue;
    horasInvertidasEnTarea += bloque.horasDelBloque;
  }
  return {
    horasInvertidasEnTarea: horasInvertidasEnTarea,
    horasInvertidasEnProyecto: horasInvertidasEnProyecto,
    horasDisponiblesEnSemana: horasDisponiblesEnSemana,
  };
}

function estaEnSemanaActual(fecha: Date) {
  const fechaObj = new Date(fecha);
  const fechaActual = new Date();
  const numeroDiaActual = fechaActual.getDate();
  const diaDeSemanaActual = fechaActual.getDay();
  const primerDiaDeSemana = new Date(fechaActual.setDate(numeroDiaActual - diaDeSemanaActual));
  const ultimoDiaDeSemana = new Date(primerDiaDeSemana);
  ultimoDiaDeSemana.setDate(ultimoDiaDeSemana.getDate() + 6);
  const rta = fechaObj >= primerDiaDeSemana && fechaObj <= ultimoDiaDeSemana;
  return rta;
}


function getStats(recurso: number, recursosMap: Map<number, RecursoStats>): RecursoStats {
  let stats = recursosMap.get(recurso);
  if (stats == undefined) {
    return {
      horasInvertidasEnTarea: 0,
      horasInvertidasEnProyecto: 0,
      horasDisponiblesEnSemana: 0,
    };
  } else {
    return stats;
  }
}
