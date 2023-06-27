import { Ticket } from "@/pages/types";
import { headers } from "next/dist/client/components/headers";
import { useEffect, useState } from "react";
import { NotificacionExitosa } from "./NotificacionExitosa";
import { NotificacionCrearTicket } from "./NotificacionCrearTicket";
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

export const FormTicket: React.FC<{ productIdNumerico: number }> = ({
  productIdNumerico,
}) => {
  //esto lo usamos para sacar el id maximo de todos los tickets.
  const [tickets, setTickets] = useState<Array<Ticket>>(TICKETS_SACARMAX);
  const [notificacion, setNotificacion] = useState<boolean>(false);

  const formatDateTime = (dateTime: Date): string => {
    const year = String(dateTime.getFullYear());
    const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso se suma 1
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const [notificacionOk, setNotificacionOk] = useState(false);
  var [notificacionError, setnotificacionError] = useState(false);

  const funcionEnviarDatos = () => {
    if (
      inputTicketValues.title !== "Nuevo Titulo" &&
      inputTicketValues.description !== "Nueva Descripcion" &&
      inputTicketValues.severity !== "" &&
      inputTicketValues.priority !== "" &&
      inputTicketValues.timeStart !== "" &&
      inputTicketValues.type !== "" &&
      inputTicketValues.supportTime !== "" &&
      inputTicketValues.client_id !== 0 &&
      inputTicketValues.responsible_id !== 0
    ) {
      setNotificacionOk(true);
      return true;
    } else {
      setnotificacionError(true);
    }
    return false;
  };

  const [inputTicketValues, setInputTicketValues] =
    useState<formTicketState["inputValuesTicket"]>(INITIAL_STATE);
  const fetchTickets = (): Promise<Array<Ticket>> => {
    //2) Llamanda al backend Necesitamos obtener todos los tickets.
    return fetch("https://psa-soporte.eeoo.ar/tickets").then((res) =>
      res.json()
    );
  };
  const fetchPOSTTicket = () => {
    const URLParaPOST = `https://psa-soporte.eeoo.ar/ticket/product/${inputTicketValues.product_id}/client/${inputTicketValues.client_id}/responsible/${inputTicketValues.responsible_id}`;
    console.log(URLParaPOST);
    //asi reseteamos todo tanto inputText, como botones!!
    setInputTicketValues(INITIAL_STATE);
    setSelectedClientOption("");
    setSelectedPrioridad("");
    setSelectedSeveridad("");
    setselectRecursoOption("");
    setselectTipoTicket("");

    const cuerpoMensaje = JSON.stringify(inputTicketValues);
    console.log("cuerpoMensaje");
    console.log(cuerpoMensaje);
    fetch(URLParaPOST, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: cuerpoMensaje,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Solicitud POST exitosa");
        } else console.log("Error en la solicitud POST");
      })
      .catch((error) => {
        console.log("Error en la solicitud POST", error);
      });
  };

  const obtenerMaximoId = (tickets: Array<Ticket>) => {
    const maxId = tickets.reduce((max, ticket) => {
      return ticket.id > max ? ticket.id : max;
    }, 0);
    return maxId;
  };

  const [selectedPrioridad, setSelectedPrioridad] = useState("");
  const handlePrioridadClick = (prioridad: string) => {
    setSelectedPrioridad(prioridad);
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
    }));
  };
  //actualizar y que aparezca en la pantalla las letras que tecleamos en el teclado por ejemplo.
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

  //Es hacer una peticion de post.
  //debe tener todos los chequeos.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputTicketValues({
      ...inputTicketValues,
      timeStart: formatDateTime(new Date()).toString(),
    });
    //Si queremos que las 4 lineas anteriores se ejecuten en el proximo renderezado
    // debemos usar useEffect con el ward en inputTicketValues y ojo filtramos lo que queremos
    // con un if por ej dentro del userEffect el if debemos ver si cambio por ej timeStart !=="" o id !==0
  };

  //UserEffect para obtener el maxId de ticket
  // le sumamos 1 , lo neceistamos para hacer un post del nuevo ticket.
  useEffect(() => {
    fetchTickets().then((ticketsFetch) => {
      setTickets(ticketsFetch); //Aca estamos pisando los tickets con los ticket que obtenemos al hacer fetch GET.
    });

    setInputTicketValues({
      ...inputTicketValues,
      id: obtenerMaximoId(tickets) + 1,
      product_id: productIdNumerico,
    });
  }, []);

  //userEffect para poder asignarle el timeStart cuando hace click en el boton submit
  useEffect(() => {
    if (parseInt(inputTicketValues.supportTime) <= 0) {
      console.log("Cantidad de horas invalidas.");
      setnotificacionError(true);
    }
    if (inputTicketValues.timeStart !== "") {
      console.log(inputTicketValues);
      console.log("ENtre aca adentro del if del timeStart");
      if (funcionEnviarDatos()) {
        fetchPOSTTicket();
      } else {
        setInputTicketValues({ ...inputTicketValues, timeStart: "" });
      }
      console.log(" VACIO");
    }
  }, [inputTicketValues]);

  return (
    <>
      <form onSubmit={handleSubmit} id="FormTicket">
        <div id="divPrincipal">
          <h1>Creación de ticket</h1> <hr />
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
          <div id="divBotones">
            <span> Prioridad {"\t"}</span>
            <button
              type="button"
              className={selectedPrioridad === "Alta" ? "selected" : ""}
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
        {notificacionOk && (
          <NotificacionCrearTicket
            onClose={() => setNotificacionOk(false)}
            tipo="OK"
          />
        )}
        {notificacionError && (
          <NotificacionCrearTicket
            onClose={() => setnotificacionError(false)}
            tipo="ERROR"
          />
        )}
      </form>
      {notificacion && <div className="notification">{notificacion}</div>}
    </>
  );
};
