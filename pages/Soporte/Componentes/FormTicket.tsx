import { Ticket } from "@/pages/types";
import { useState } from "react";

interface formTicketState {
  inputValuesTicket: Ticket;
}
const INITIAL_STATE = {
  title: "Nuevo Titulo",
  description: "una Descripcion",
  severity: "",
  priority: "",
  state: "",
  timeStart: "",
  type: "",
  supportTime: "",
  id: 0,
  product_id: 0,
  client_id: 0,
  responsible_id: 0,
};

export const FormTicket = () => {
  const [inputValues, setInputValues] =
    useState<formTicketState["inputValuesTicket"]>(INITIAL_STATE);

  const [selectedPrioridad, setSelectedPrioridad] = useState("");
  const handlePrioridadClick = (prioridad: string) => {
    setSelectedPrioridad(prioridad);
  };

  const [selectedSeveridad, setSelectedSeveridad] = useState("");
  const handleSeveridadClick = (severidad: string) => {
    setSelectedSeveridad(severidad);
  };

  //Es hacer una peticion de post.
  //debe tener todos los chequeos.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    return null;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const handleClickClear = () => {
    setInputValues(INITIAL_STATE);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="FormTicket">
        <div id="divPrincipal">
          <div id="divTitulo">
            <span> Titulo </span>
            <input
              onChange={handleChange}
              value={inputValues.title}
              type="text"
              name="title"
              placeholder="Titulo"
            />
          </div>
          <div id="divBotones">
            <span> Prioridad {"\t"}</span>
            <button
              type="button"
              className={selectedPrioridad === "Alta" ? "selected" : ""} //cuando haga click cambia el className a alta si no le hace click sige siendo ""
              onClick={() => handlePrioridadClick("Alta")}
            >
              Alta{" "}
            </button>
            <button
              type="button"
              className={selectedPrioridad === "Media" ? "selected" : ""}
              onClick={() => handlePrioridadClick("Media")}
            >
              Media{" "}
            </button>
            <button
              type="button"
              className={selectedPrioridad === "Baja" ? "selected" : ""}
              onClick={() => handlePrioridadClick("Baja")}
            >
              Baja{" "}
            </button>
          </div>

          <div id="divBotones">
            <span> Severidad {"\t"}</span>
            <button
              type="button"
              className={selectedSeveridad === "LS1" ? "selected" : ""}
              onClick={() => handleSeveridadClick("LS1")}
            >
              LS1{" "}
            </button>
            <button
              type="button"
              className={selectedSeveridad === "LS2" ? "selected" : ""}
              onClick={() => handleSeveridadClick("LS2")}
            >
              LS2{" "}
            </button>
            <button
              type="button"
              className={selectedSeveridad === "LS3" ? "selected" : ""}
              onClick={() => handleSeveridadClick("LS3")}
            >
              LS3{" "}
            </button>
            <button
              type="button"
              className={selectedSeveridad === "LS4" ? "selected" : ""}
              onClick={() => handleSeveridadClick("LS4")}
            >
              LS4{" "}
            </button>
          </div>
          <div id="divDescripcion">
            <span> Descripcion</span>
            <textarea
              onChange={handleChange}
              value={inputValues.description}
              name="description"
              placeholder="Descripcion"
            />
          </div>
          <div id="divHorasSoporte">
            <span> Tiempo para solucionar el ticket: </span>
            <input
              onChange={handleChange}
              value={inputValues.supportTime}
              type="text"
              name="supportTime"
              placeholder="horas"
            />{" "}
            Horas
          </div>

          <button type="submit" id="GuardarCambios">
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  );
};
/*
 <p>
            <strong>Descripcion: </strong>
            <textarea
              onChange={handleChange}
              value={inputValues.description}
              name="description"
              placeholder="Descripcion"
            />
          </p>

          <div>
          <p>
            <strong>Titulo: </strong>
            <input
              onChange={handleChange}
              value={inputValues.title}
              type="text"
              name="title"
              placeholder="Titulo"
            />
          </p>
          <p>
            <strong>Prioridad: </strong>
            <input
              onChange={handleChange}
              value={inputValues.priority}
              type="text"
              name="priority"
              placeholder="Prioridad"
            />
          </p>
        </div>
        <div>
          <p>
            <strong>Descripcion: </strong>
            <textarea
              onChange={handleChange}
              value={inputValues.description}
              name="description"
              placeholder="Descripcion"
            />
          </p>
        </div>
*/
