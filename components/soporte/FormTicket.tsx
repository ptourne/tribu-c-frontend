import { Ticket, Cliente } from "@/components/types";
import { headers } from "next/dist/client/components/headers";
import { useEffect, useState } from "react";
import { NotificacionesDelTicket } from "./NotificacionTicket";
import { ARRAY_CLIENTES } from "./Constantes";
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

//REMPLAZARLO CON FETCH en un futuro lo de ARRAY_CLIENTES

const ARRAY_RECURSOS = [
  { legajo: 1, Nombre: "Mario", Apellido: "Mendoza" },
  { legajo: 2, Nombre: "Maria", Apellido: "Perez" },
  { legajo: 3, Nombre: "Patricia", Apellido: "Gaona" },
];

export const FormTicket: React.FC<{
  productIdNumerico: number;
  idTicketRecv: number;
}> = ({ productIdNumerico, idTicketRecv }) => {
  let tituloForm = "Edición de ticket";
  if (idTicketRecv === -1) {
    tituloForm = "Creación de ticket";
  }
  const mensajeToShow: string =
    idTicketRecv === -1
      ? "Ticket creado con éxito"
      : "Ticket actualizado con éxito";

  const [clickSubmit, setClickSubmit] = useState<Boolean>(false);
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [showCient, setShowCliente] = useState<Boolean>(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const obtenerNombreCliente = (idCliente: number): string => {
    const unCliente = clientes.find((unCliente) => unCliente.id == idCliente);
    if (unCliente) {
      return unCliente["razon social"];
    }
    return "CLIENTE-DESCONOCIDO";
  };
  const fetchClientes = (): Promise<Array<Cliente>> => {
    //2) Llamanda al backend Necesitamos obtener todos los tickets.
    return fetch("https://psa-soporte.eeoo.ar/clients").then((res) =>
      res.json()
    );
  };

  const fetchTickets = (): Promise<Array<Ticket>> => {
    //2) Llamanda al backend Necesitamos obtener todos los tickets.
    return fetch("https://psa-soporte.eeoo.ar/tickets", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  const getMaxIdTicket = (tickets: Array<Ticket>) => {
    const maxId = tickets.reduce((max, ticket) => {
      return ticket.id > max ? ticket.id : max;
    }, 0);
    return maxId;
  };

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

  const limpiezaDeCamposDelForm = () => {
    setInputTicketValues(INITIAL_STATE);
    setSelectedClientOption("");
    setSelectedPrioridad("");
    setSelectedSeveridad("");
    setselectRecursoOption("");
    setselectTipoTicket("");
  };

  const [inputTicketValues, setInputTicketValues] =
    useState<formTicketState["inputValuesTicket"]>(INITIAL_STATE);

  function hasLetter(input: string): boolean {
    return /[a-zA-Z]/.test(input);
  }

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
      (unCliente) => unCliente["razon_social"] === event.target.value //En el fin de usa triple === igual !!!!
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
    setClickSubmit(true);
    event.preventDefault();
    if (idTicketRecv == -1) {
      setInputTicketValues({
        ...inputTicketValues,
        timeStart: formatDateTime(new Date()).toString(),
      });
    }

    //Aca estamos modificando el inputTicketValues asi que inmediatamente ira al UseEffect [inputTicketValues].
    //Si queremos que las 4 lineas anteriores se ejecuten en el proximo renderezado usar el UE con el ward en inputTicketValues y ojo filtramos lo que queremos
    // con un if por ej dentro del userEffect el if debemos ver si cambio por ej timeStart !=="" o id !==0
  };

  //UserEffect para obtener el maxId de ticket le sumamos 1 , lo neceistamos para hacer un post del nuevo ticket.
  useEffect(() => {
    const getTicketByTicketID = (): Promise<Ticket> => {
      return fetch(`https://psa-soporte.eeoo.ar/ticket/${idTicketRecv}`).then(
        (res) => res.json()
      );
    };
    console.log("Clientes:");
    console.log(clientes);
    fetchClientes().then((clientesFetch) => {
      setClientes(clientesFetch);
    });

    if (idTicketRecv === -1) {
      console.log("ENtro aca en el crear DEL PRIMER UE");

      fetchTickets().then((ticketsFetch) => {
        setTickets(ticketsFetch);
      });
      setInputTicketValues({
        ...inputTicketValues,
        id: getMaxIdTicket(tickets) + 1,
        product_id: productIdNumerico,
      });
    } else {
      console.log("Entramos al else estamos en el EDITAR !!------"); //.then((unTicket: Ticket) => unTicket.timeStart)

      //caso edicion ya recibimos el id como argumento lo usamos recopilamos el id
      //aca debemos hacer el fetch de tiket por el id que recibimos
      setShowCliente(false);
      getTicketByTicketID().then((unTicket) => {
        setInputTicketValues({
          ...inputTicketValues,
          timeStart: unTicket.timeStart,
          product_id: productIdNumerico,
          id: idTicketRecv,
          client_id: unTicket.client_id,
        });
      });
    }
  }, [idTicketRecv, productIdNumerico, tickets]);

  //userEffect para poder asignarle el timeStart cuando hace click en el boton submit
  useEffect(() => {
    fetchTickets().then((ticketsFetch) => {
      setTickets(ticketsFetch);
    });
    //Funcion para crear un ticket
    const fetchPOSTTicket = () => {
      const URLParaPOST = `https://psa-soporte.eeoo.ar/ticket/product/${inputTicketValues.product_id}/client/${inputTicketValues.client_id}/responsible/${inputTicketValues.responsible_id}`;
      console.log(URLParaPOST);

      const cuerpoMensaje = JSON.stringify(inputTicketValues);
      console.log("cuerpoMensaje-POST");
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
        .then((data) => {
          console.log(
            "Respuesta de lo que devuelve el servidor luego de hacer un POST: @Ricardo "
          );
          console.log(data);
        })
        .catch((error) => {
          console.log("Error en la solicitud POST", error);
        });

      //asi reseteamos todo tanto inputText, como botones!!
      limpiezaDeCamposDelForm();
    };
    const validInputs = (): boolean => {
      return (
        inputTicketValues.title !== "Nuevo Titulo" &&
        inputTicketValues.description !== "Nueva Descripcion" &&
        inputTicketValues.severity !== "" &&
        inputTicketValues.priority !== "" &&
        inputTicketValues.timeStart !== "" &&
        inputTicketValues.type !== "" &&
        inputTicketValues.supportTime !== "" &&
        inputTicketValues.client_id !== 0 &&
        inputTicketValues.responsible_id !== 0
      );
    };
    const fetchPUTTicket = () => {
      const URLParaPUT = `https://psa-soporte.eeoo.ar/tickets/${idTicketRecv}`;
      const objetoAEnviar = {
        title: inputTicketValues.title,
        description: inputTicketValues.description,
        severity: inputTicketValues.severity,
        priority: inputTicketValues.priority,
        state: inputTicketValues.state,
        timeStart: inputTicketValues.timeStart,
        type: inputTicketValues.type,
        supportTime: inputTicketValues.supportTime,
      };
      const cuerpoMensaje = JSON.stringify(objetoAEnviar);
      console.log("cuerpoMensaje-PUT");
      console.log(cuerpoMensaje);
      fetch(URLParaPUT, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: cuerpoMensaje,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Solicitud PUT exitosa");
          } else console.log("Error en la solicitud PUT");
        })
        .catch((error) => {
          console.log("Error en la solicitud PUT", error);
        });
      limpiezaDeCamposDelForm();
    };
    const validationInputPlus = () => {
      if (
        parseInt(inputTicketValues.supportTime) <= 0 ||
        parseInt(inputTicketValues.supportTime) >= 10000
      ) {
        console.log(
          "Cantidad de horas " + inputTicketValues.supportTime + " invalidas."
        );
        setnotificacionError(true);
        return false;
      }

      if (inputTicketValues.supportTime == " ") {
        console.log("Ingrese un valor valido para las horas.");
        setnotificacionError(true);
        return false;
      }

      if (inputTicketValues.supportTime == "") {
        console.log("Complete el campo de horas necesarias.");
        setnotificacionError(true);
        return false;
      }

      if (hasLetter(inputTicketValues.supportTime)) {
        console.log("Ingrese solo numeros.");
        setnotificacionError(true);
        return false;
      }

      if (
        inputTicketValues.description == " " ||
        inputTicketValues.description == ""
      ) {
        console.log("Descripcion invalida.");
        setnotificacionError(true);
        return false;
      }

      if (inputTicketValues.title == "" || inputTicketValues.title == " ") {
        console.log("Titulo invalido.");
        setnotificacionError(true);
        return false;
      }
      return true;
    };

    console.log("inputTicketValues");
    console.log(inputTicketValues);

    if (validInputs() && clickSubmit && validationInputPlus()) {
      console.log(inputTicketValues);
      if (idTicketRecv === -1) {
        fetchPOSTTicket();
      } else {
        console.log(inputTicketValues);
        fetchPUTTicket();
      }
      setNotificacionOk(true);
      console.log("Se mostro la notificaicon OK");
    }
    if (!validInputs() && clickSubmit && !notificacionOk) {
      setnotificacionError(true);
    }
    setClickSubmit(false);
  }, [clickSubmit, idTicketRecv, notificacionOk]);

  return (
    <>
      <form onSubmit={handleSubmit} id="FormTicket">
        <div id="divPrincipal">
          <h1>{tituloForm}</h1> <hr />
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
          {showCient && (
            <div id="divListBox">
              <label htmlFor="listbox">Seleccione el cliente:</label>
              <select
                id="listbox"
                value={selectedClientOption}
                onChange={handleClientOptionChange}
              >
                <option value=""> Seleccione... </option>
                {clientes.map((unCliente) => (
                  <option key={unCliente.id}>
                    {unCliente["razon social"]}
                  </option>
                ))}
              </select>
              {clientes.length === 0 && (
                <span id="CargandoClientes">
                  Cargando clientes, por favor espere
                </span>
              )}
              {clientes.length !== 0 && (
                <span id="ClientesCargados">Clientes cargados !</span>
              )}
            </div>
          )}
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
          <NotificacionesDelTicket
            onClose={() => setNotificacionOk(false)}
            tipo="OK"
            mensaje={mensajeToShow}
          />
        )}
        {notificacionError && (
          <NotificacionesDelTicket
            onClose={() => setnotificacionError(false)}
            tipo="ERROR"
            mensaje="Error. Ingrese todos los datos"
          />
        )}
      </form>
      {notificacion && <div className="notification">{notificacion}</div>}
    </>
  );
};
