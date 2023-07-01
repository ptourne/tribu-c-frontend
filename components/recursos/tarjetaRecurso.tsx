import { BloqueDeTrabajo, Recurso, RecursoStats, Tarea } from "@/components/types";
// import { RecursoStats } from "./types";
import Popup from "./popup";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RECURSOS_URL, SERVER_NAME_PROYECTOS } from "@/environments";
import { CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TarjetaRecurso {
  recurso: Recurso;
  tareaActual: Tarea;
  stats: RecursoStats;
}
export const TarjetaRecurso: React.FC<TarjetaRecurso> = ({
  recurso,
  tareaActual,
  stats
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [horas, setHoras] = useState(0);
  const [fechaDelBloque, setStartDate] = useState(new Date());
  // Esto abre el popup
  const togglePopup = () => {
    if (!isOpen) setIsOpen(true);
  };
  const closePopup = () => {
    if (isOpen) setIsOpen(false);
  };

  // Esto es para cargar en la variable horas el input del user
  const handleCambioDeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(event.target.value);
    if (isNaN(number)) {
      number = 0;
    }
    setHoras(number);
  };

  const handleCambioDeFecha = (date: Date) => {
    setStartDate(date);
  };
  // Evento del click del botón
  const handleClick = () => {
    if (tareaActual.id_tarea == undefined)
      return;
    const bloque = {
      codProyectoDeLaTarea: parseInt(tareaActual.id_proyecto),
      codTarea: parseInt(tareaActual.id_tarea),
      legajo: recurso.legajo,
      horasDelBloque: horas,
      fecha: fechaDelBloque, // Agregar bloque laboral
    };
    axios
      .post(RECURSOS_URL + "bloque_laboral", bloque)
      .then(() => {
        toast.success("Bloque asignado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setIsOpen(false);
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
  };



  return (
    <>
      <div
        onClick={togglePopup}
        className="d-flex flex-column border-2 border-dark rounded-2 mb-3 mt-3 mx-3"
      >
        <div className="d-flex justify-content-between mr-6">
          <label className="my-3 ml-3">{recurso.Nombre}</label>
          <label className="my-3 ml-3">{tareaActual.titulo}</label>
          <label className="my-3 ml-9">
            {stats.horasDisponiblesEnSemana + " Horas"}
          </label>
          <button onClick={closePopup}>X</button>
        </div>
        {isOpen && (
          <Popup
            content={
              <>
                <div className="flex-grow-1 d-flex flex-column justify-content-between flex-row ml-6">
                  <label className="col-md-6 form-label align-items-center">
                    Horas consumidas en la tarea: {stats.horasInvertidasEnTarea}
                  </label>
                  <label className="col-md-6 form-label align-items-center">
                    Horas consumidas en el proyecto: {stats.horasInvertidasEnProyecto}
                  </label>
                  <div className="flex-grow-1 d-flex flex-row">
                    <label>Horas estimadas:</label>
                    <input
                      type="text"
                      className="d-flex flex-column  border-2 border-dark rounded-2 bd-highlight mb-3 ml-9 align-items-center"
                      id="horas"
                      value={horas}
                      onChange={handleCambioDeHoras}
                      maxLength={4}
                    />
                  </div>
                  <div className="flex-grow-1 d-flex flex-row">
                    <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-row">
                      <label
                        htmlFor="startDate"
                        className="col-md-6 form-label"
                      >
                        Dia
                      </label>
                      <div className="col-md-6">
                        <DatePicker
                          selected={fechaDelBloque}
                          onChange={handleCambioDeFecha}
                          className="form-control border-0 border-bottom rounded-0 p-0"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Seleccione una fecha"
                          filterDate={(fechaDelBloque) => {
                            const day = fechaDelBloque.getDay();
                            return day !== 0 && day !== 6;
                          } }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-end ml-2 mr-3 mb-3">
                      <button
                        type="button"
                        className="btn btn-primary mt-auto p-2"
                        onClick={handleClick}
                      >
                        Asignar bloque
                      </button>
                    </div>
                  </div>
                </div>
              </>
            }
          />
        )}
      </div>
    </>
  );
};
