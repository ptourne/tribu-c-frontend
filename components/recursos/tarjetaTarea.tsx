import { SetStateAction, useEffect, useState } from "react";
import Popup from "./popup";
import {
  FaSistrix,
  FaSearchengin,
  FaPencilAlt,
  FaUserClock,
} from "react-icons/fa";
import { BloqueDeTrabajo, Tarea } from "@/components/types";
import { RECURSOS_URL, SERVER_NAME_PROYECTOS } from "@/environments";
import axios from "axios";
import { toast } from "react-toastify";

interface TarjetaTarea {
  bloqueDeTrabajo: BloqueDeTrabajo;
  tareaAsociada: Tarea;
}
export const TarjetaTarea: React.FC<TarjetaTarea> = ({ bloqueDeTrabajo,tareaAsociada }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [esEliminada, setEsEliminada] = useState(false);
  const [horas, setHoras] = useState(bloqueDeTrabajo.horasDelBloque);
  const classNameDiv = "d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 align-items-center " + colorDeTarea(tareaAsociada.estado);
  const classNameInput = "form-control border-0 rounded-0 p-1 " + colorDeTarea(tareaAsociada.estado);
  
  const togglePopup = () => {
    if (!isOpen) setIsOpen(true);
  };

  const ocultarClick = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(event.target.value);
    if (isNaN(number)) {
      number = 0;
    }
    setHoras(number);
  };

  const guardarClick = () => {
    const bloque = {
      codBloqueLaboral: bloqueDeTrabajo.codBloqueLaboral,
      codProyectoDeLaTarea: bloqueDeTrabajo.codProyectoDeLaTarea,
      codTarea: bloqueDeTrabajo.codTarea,
      legajo: bloqueDeTrabajo.legajo,
      horasDelBloque: horas,
      fecha: bloqueDeTrabajo.fecha, // Agregar bloque laboral
    };
    axios
      .put(
        RECURSOS_URL +
          "bloque_laboral/" +
          bloqueDeTrabajo.codBloqueLaboral.toString(),
        bloque
      )
      .then(() => {
        toast.success("Bloque asignado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al crear el bloque: " + e.response?.data?.msg
            : "Hubo un error al crear el bloque",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
    setIsOpen(false);
  };

  const eliminarClick = async () => {
      axios.delete(RECURSOS_URL + "{bloque_laboral}?codBloqueLaboral=" + bloqueDeTrabajo.codBloqueLaboral.toString())
      .then(() => {
        toast.success("Bloque eliminado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setIsOpen(false);
        setEsEliminada(true);
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.msg
            ? "Hubo un error al eliminar el bloque: " + e.response?.data?.msg
            : "Hubo un error al eliminar el bloque",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          }
        );
      });
  };

  return (
    <div>
      {!esEliminada ? (
        <div
          onClick={togglePopup}
          className={classNameDiv}
          style={estilos.filas}
        >
          {tareaAsociada.titulo}
          {isOpen && (
            <Popup
              content={
                <>
                  <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row ml-1">
                    <label className="col-md-6 form-label align-items-center">
                      Horas aplicadas
                    </label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={classNameInput}
                        id="horas"
                        value={horas}
                        onChange={handleCambioDeHoras}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-evenly">
                    <div
                      onClick={guardarClick}
                      className="d-flex flex-column border-2 border-dark rounded-2 mw-100 ps-3 pe-3 mb-3 mt-2 mx-1  align-items-center "
                    >
                      guardar
                    </div>
                    <div
                      onClick={eliminarClick}
                      className="d-flex flex-column border-2 border-dark rounded-2 mw-100 ps-3 pe-3 mb-3 mt-2 mx-1  align-items-center "
                    >
                      eliminar
                    </div>
                    <div
                      onClick={ocultarClick}
                      className="d-flex flex-column border-2  border-dark rounded-2  ps-3 pe-3 mb-3 mt-2 mx-1 align-items-center "
                    >
                      ocultar
                    </div>
                  </div>
                </>
              }
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

function colorDeTarea(estadoTarea: number) {
  switch (estadoTarea) {
    case 0:
      return "bg-info";
    case 1:
      return "bg-warning";
    case 2:
      return "bg-success";
    default:
      return;
  }
}
const estilos = {
  filas: {
    margin: "10px",
  },
};
