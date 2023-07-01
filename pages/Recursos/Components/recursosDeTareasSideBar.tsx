import { useEffect, useState } from "react";
import { Recurso, Tarea } from "../../types";
import { TarjetaRecurso } from "./tarjetaRecurso";
import { CircularProgress } from "@mui/material";
import { RECURSOS_URL } from "@/environments";

interface RecursosDeTareasSideBar {
  tarea: Tarea | undefined;
  project_id: string;
}

export const RecursosDeTareasSideBar: React.FC<RecursosDeTareasSideBar> = ({
  tarea,
  project_id,
}) => {
  if (tarea) {
    tarea.id_proyecto = project_id;
  }
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const getRecursos = async () => {
    try {
      const response = await fetch(RECURSOS_URL + "recurso");
      const data = await response.json();
      setRecursos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  useEffect(() => {
    getRecursos();
  }, []);

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
                  />
                )
            )
          )}
        </div>
      </form>
    </>
  );
};

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
    width: "50%",
  },
  filas: {
    margin: "10px",
  },
};
