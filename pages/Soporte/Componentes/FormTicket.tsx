import { Ticket } from "@/pages/types";
import { useEffect, useState } from "react";

interface formTicketState {
  inputValuesTicket: Ticket;
}
const INITIAL_STATE = {
  title: "Nuevo Titulo",
  description: "Nueva Descripcion",
  severity: "",
  priority: "",
  state: "Iniciado",
  timeStart: "",
  type: "",
  supportTime: "",
  id: 0,
  product_id: 0,
  client_id: 0,
  responsible_id: 0,
};
//REMPLAZARLO CON FETCH
const ARRAY_CLIENTES = [
  { id: 1, "razon social": "FIUBA", CUIT: "20-12345678-2" },
  { id: 2, "razon social": "FSOC", CUIT: "20-12345678-5" },
  { id: 3, "razon social": "Macro", CUIT: "20-12345678-3" },
];

//REMPLAZARLO CON FETCH
const ARRAY_RECURSOS = [
  { legajo: 1, Nombre: "Mario", Apellido: "Mendoza" },
  { legajo: 2, Nombre: "Maria", Apellido: "Perez" },
  { legajo: 3, Nombre: "Patricia", Apellido: "Gaona" },
];

const TICKETS_SACARMAX = [
  {
    title: "Nueva solicitud de soporte",
    description: "Se requiere asistencia para resolver un problema técnico",
    severity: "LS3",
    priority: "Media",
    state: "Abierto",
    timeStart: "02-06-2023 10:30",
    type: "Bug",
    supportTime: "8H",
    id: 5,
    product_id: 2,
    client_id: 3,
    responsible_id: 3,
  },
  {
    title: "Problema de rendimiento del servidor",
    description: "El servidor está experimentando tiempos de respuesta lentos",
    severity: "LS1",
    priority: "Alta",
    state: "Abierto",
    timeStart: "05-06-2023 16:45",
    type: "Bug",
    supportTime: "24H",
    id: 6,
    product_id: 2,
    client_id: 4,
    responsible_id: 4,
  },
  {
    title: "Actualizacion de calculo de prioridad 1",
    description: "Se quiere actualizar el calculo",
    severity: "LS1",
    priority: "Alta",
    state: "Abierto",
    timeStart: "01-06-2023 18:40",
    type: "Bug",
    supportTime: "24H",
    id: 3,
    product_id: 1,
    client_id: 1,
    responsible_id: 1,
  },
  {
    title: "Nueva solicitud de soporte",
    description: "Se requiere asistencia para resolver un problema técnico",
    severity: "LS3",
    priority: "Media",
    state: "Abierto",
    timeStart: "02-06-2023 10:30",
    type: "Bug",
    supportTime: "8H",
    id: 4,
    product_id: 1,
    client_id: 2,
    responsible_id: 2,
  },
];
// Esto hay que refactorizar no puede ser tan complejo para pasar un simple number
export const FormTicket: React.FC<{ productIdNumerico: number }> = ({
  productIdNumerico,
}) => {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const fetchTickets = (): Promise<Array<Ticket>> => {
    //1) Llamanda al backend hacemos un GET de productos.
    return fetch("https://psa-soporte.eeoo.ar/tickets").then((res) =>
      res.json()
    );
  };
  const obtenerMaximoId = (tickets: Array<Ticket>) => {
    const maxId = tickets.reduce((max, ticket) => {
      return ticket.id > max ? ticket.id : max;
    }, 0);
    return maxId;
  };

  const [inputTicketValues, setInputTicketValues] =
    useState<formTicketState["inputValuesTicket"]>(INITIAL_STATE);

  const [selectedPrioridad, setSelectedPrioridad] = useState("");
  const handlePrioridadClick = (prioridad: string) => {
    setSelectedPrioridad(prioridad);
    //asi con el setDeInputTicket solo cambio una propiedad de la interfaz el resto lo mantengo igual .
    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      priority: prioridad,
    }));
  };

  const [selectTipoTicket, setselectTipoTicket] = useState("");
  const handleSelectTipoTicket = (tipoTicket: string) => {
    setselectTipoTicket(tipoTicket);
    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      type: tipoTicket,
    }));
  };

  const [selectedSeveridad, setSelectedSeveridad] = useState("");
  const handleSeveridadClick = (severidad: string) => {
    setSelectedSeveridad(severidad);
    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      severity: severidad,
    }));
  };

  //para la boxList de clientes
  const [selectedClientOption, setSelectedClientOption] = useState("");
  const handleClientOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedClientOption(event.target.value);
    const clienteCoincideRazon = ARRAY_CLIENTES.find(
      (unCliente) => unCliente["razon social"] === event.target.value //En el fin de usa triple === igual !!!!
    );
    let clientId = 100;
    if (typeof clienteCoincideRazon === "undefined") {
      clientId = -1;
    } else clientId = clienteCoincideRazon?.id;

    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      client_id: clientId,
    }));
  };

  //para la boxList de recursos (gente que resuelve el problema)
  const [selectRecursoOption, setselectRecursoOption] = useState("");
  const handleRecursoOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setselectRecursoOption(event.target.value);
    const recursoCoincideNombre = ARRAY_RECURSOS.find(
      (unRecurso) => unRecurso["Nombre"] === event.target.value //En el fin de usa triple === igual !!!!
    );
    let responsibleId = 100;
    if (typeof recursoCoincideNombre === "undefined") {
      responsibleId = -1;
    } else responsibleId = recursoCoincideNombre?.legajo;

    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      responsible_id: responsibleId,
      product_id: productIdNumerico,
    }));
  };

  //Es hacer una peticion de post.
  //debe tener todos los chequeos.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputTicketValues);
    setInputTicketValues(INITIAL_STATE);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputTicketValues({
      ...inputTicketValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchTickets().then((ticketsFetch) => {
      setTickets(ticketsFetch);
    });
    setInputTicketValues((estadoPrevio) => ({
      ...estadoPrevio,
      id: obtenerMaximoId(tickets) + 1,
    }));
  }, [tickets]);
  // cada vez que cambie ticket va a ejecutar el fetch y el setInput del id.

  return (
    <>
      <form onSubmit={handleSubmit} id="FormTicket">
        <div id="divPrincipal">
          <div id="divTitulo">
            <span> Titulo </span>
            <input
              onChange={handleChange}
              value={inputTicketValues.title}
              type="text"
              name="title"
              placeholder="Titulo"
            />
          </div>
          {/* Div titulo listo */}

          <div id="divBotones">
            <span> Prioridad {"\t"}</span>
            <button
              type="button"
              className={selectedPrioridad === "Alta" ? "selected" : ""} //cuando haga click cambia el className a alta si no le hace click sige siendo ""
              onClick={() => handlePrioridadClick("Alta")}
            >
              Alta
            </button>
            <button
              type="button"
              className={selectedPrioridad === "Media" ? "selected" : ""}
              onClick={() => handlePrioridadClick("Media")}
            >
              Media
            </button>
            <button
              type="button"
              className={selectedPrioridad === "Baja" ? "selected" : ""}
              onClick={() => handlePrioridadClick("Baja")}
            >
              Baja
            </button>
          </div>
          {/* Div prioridad listo */}

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
          {/* Div severidad listo */}

          <div id="divBotones">
            <span> Tipo de Ticket </span>
            <button
              type="button"
              className={selectTipoTicket === "Actualizacion" ? "selected" : ""} //cuando haga click cambia el className a alta si no le hace click sige siendo ""
              onClick={() => handleSelectTipoTicket("Actualizacion")}
            >
              Actualizacion
            </button>
            <button
              type="button"
              className={selectTipoTicket === "Bug" ? "selected" : ""}
              onClick={() => handleSelectTipoTicket("Bug")}
            >
              Bug
            </button>
          </div>
          {/* Div tipo ticket listo */}

          <div id="divListBox">
            <label htmlFor="listbox">Seleccione el cliente:</label>
            <select
              id="listbox"
              value={selectedClientOption}
              onChange={handleClientOptionChange}
            >
              <option value=""> Seleccione... </option>
              {ARRAY_CLIENTES.map((unCliente) => (
                <option key={unCliente.id}>{unCliente["razon social"]}</option>
              ))}
            </select>
          </div>
          {/* Div tipo de cliente falta */}

          <div id="divListBox">
            <label htmlFor="listbox">Seleccione un recurso :</label>
            <select
              id="listbox"
              value={selectRecursoOption}
              onChange={handleRecursoOptionChange}
            >
              <option value="">Seleccione... </option>
              {ARRAY_RECURSOS.map((unRecurso) => (
                <option key={unRecurso.legajo}>{unRecurso["Nombre"]}</option>
              ))}
            </select>
          </div>
          <div id="divHorasSoporte">
            <span> Tiempo para solucionar el ticket: </span>
            <input
              onChange={handleChange}
              value={inputTicketValues.supportTime}
              type="text"
              name="supportTime"
              placeholder="horas"
            />{" "}
            Horas
          </div>
          <div id="divDescripcion">
            <span> Descripción</span>
            <textarea
              onChange={handleChange}
              value={inputTicketValues.description}
              name="description"
              placeholder="Descripcion"
            />
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
