import { Cliente, Producto, Ticket, Recurso } from "../../../components/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { FormTicket } from "../../../components/soporte/FormTicket";

//Pagina donde se muestran todos los ticket_id y esta el boton [+] para crear el nuevo ticket.

export default function Ticket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [productoSelect, setProductoSelect] = useState<Producto>();
  const [recursos, setRecurso] = useState<Array<Recurso>>([]);
  const [clientes, setClientes] = useState<Array<Cliente>>([]);
  const [ticketCount, setTicketCount] = useState(0); // Estado para controlar el número de tickets
  const [productIDRouting, setProductIDRouting] = useState("VACIO");

  const obtenerNombreCliente = (idCliente: number): string => {
    const unCliente = clientes.find((unCliente) => unCliente.id == idCliente);
    if (unCliente) {
      return unCliente["razon social"];
    }
    return "Cargando cliente, por favor espere";
  };

  const obtenerNombreRecurso = (idRecurso: number): string => {
    const recurso = recursos.find((unRecurso) => unRecurso.legajo == idRecurso);
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "Cargando recurso, por favor espere";
  };

  //Hacemos un fetch de los clientes.
  const fetchClientes = (): Promise<Array<Cliente>> => {
    return fetch("https://psa-soporte.eeoo.ar/clients", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  //Hacemos un fetch de los recursos
  const fetchRecursos = (): Promise<Array<Recurso>> => {
    return fetch("https://psa-recursos.eeoo.ar/recurso", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  //Hacemos un fetch de los tickets.
  const fetchTickets = (): Promise<Array<Ticket>> => {
    return fetch("https://psa-soporte.eeoo.ar/tickets", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const router = useRouter();

  useEffect(() => {
    const { product_id } = router.query;
    const productID: string =
      typeof product_id === "string" ? product_id : "VACIO";
    setProductIDRouting(productID);
    console.log("productIDRouting: ", productIDRouting);

    const fetchGetProductosById = (): Promise<Producto> => {
      //1) Llamanda al backend hacemos un GET de productos los id van en number recuerda !
      return fetch(
        `https://psa-soporte.eeoo.ar/product/${parseInt(productIDRouting)}`,
        {
          method: "GET",
          headers: {},
        }
      ).then((res) => res.json());
    };

    fetchClientes().then((clientesFetch) => {
      setClientes(clientesFetch);
    });
    if (productIDRouting !== "VACIO") {
      fetchGetProductosById().then((unProducto) => {
        setProductoSelect(unProducto);
      });
    }

    fetchRecursos().then((recursosFetch) => {
      setRecurso(recursosFetch);
    });

    fetchTickets().then((ticketsFetch) => {
      const ticketsFiltradoById = ticketsFetch.filter(
        (ticket) => ticket.product_id == parseInt(productIDRouting)
      );
      setTickets(ticketsFiltradoById);
    });
  }, [ticketCount, productIDRouting, router.query]); //el product_id cambia muchas veces asi que hacemos un UE por esa variable.
  //Al agregar router.query como dependencia en el arreglo de depdencia decimos que el efecto debe volver a ejecutarse cuando los
  // parametros de la URL cambian.

  const [showFormFilter, setShowFormFilter] = useState(false); // Nuevo estado para controlar la visibilidad del formulario
  const handleOpenFormTicket = () => {
    if (showFormFilter === false) {
      setShowFormFilter(true); // Muestra el formulario al hacer clic en el botón
    } else {
      setShowFormFilter(false);
    }
  };
  const formatDateTime = (creationTime: string): string => {
    const dateTime = new Date(creationTime);
    const year = String(dateTime.getFullYear());
    const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso se suma 1
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const lastDate = (creationTime: string, days: number): string => {
    const dateTime = new Date(creationTime);
    const fechaFinal = new Date(
      dateTime.getTime() + days * 24 * 60 * 60 * 1000
    );
    const year = String(fechaFinal.getFullYear());
    const month = String(fechaFinal.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0, por eso se suma 1
    const day = String(fechaFinal.getDate()).padStart(2, "0");
    const hours = String(fechaFinal.getHours()).padStart(2, "0");
    const minutes = String(fechaFinal.getMinutes()).padStart(2, "0");
    const seconds = String(fechaFinal.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleNewTicketSubmit = (nuevoTicket: Ticket) => {
    setTicketCount((contador) => contador + 1);
  };

  return (
    <>
      <div id="divTicketsPreviayCreacion">
        <div id="DivButonesAgregarYUrgente">
          <h1>{productoSelect?.name}</h1>
          <h1> Versión: {productoSelect?.version} </h1>
          <div id="divBotonesAgregarYUrgente">
            <button
              type="button"
              onClick={handleOpenFormTicket}
              id="buttonAgregarTicket"
            >
              +
            </button>
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/Soporte/Product/TicketsUrgente/${productIDRouting}`
                )
              }
              id="buttonTicketUrgente"
            >
              Tickets Urgentes
            </button>
          </div>
        </div>

        <div id="TicketsPrevia">
          <ul>
            {tickets.map((unTicket) => (
              <li key={unTicket.id} id="LiTicketForAProduct">
                <div>
                  <h2 id="tituloH1Blanco">{unTicket.title}</h2>
                  <p>
                    <strong>Descripción:</strong> {unTicket.description}
                  </p>
                  <p>
                    <strong>Severidad:</strong> {unTicket.severity}
                  </p>
                  <p>
                    <strong>Prioridad:</strong> {unTicket.priority}
                  </p>
                  <p>
                    <strong>Estado:</strong> {unTicket.state}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {unTicket.type}
                  </p>
                  <p>
                    <strong>Inicio:</strong>{" "}
                    {formatDateTime(unTicket.timeStart)}
                  </p>
                  <p>
                    <strong>Finaliza:</strong>{" "}
                    {lastDate(unTicket.timeStart, unTicket.supportTime)}
                  </p>
                  <p>
                    <strong>Cliente:</strong>{" "}
                    {obtenerNombreCliente(unTicket.client_id)}
                  </p>
                  <p>
                    <strong>Responsable:</strong>{" "}
                    {obtenerNombreRecurso(unTicket.responsible_id)}
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      router.push(`/Soporte/Product/Ticket/${unTicket.id}`)
                    }
                  >
                    Ver ticket
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {showFormFilter && (
            <div id="FormEnCreacionTicket">
              <FormTicket
                productIdNumerico={parseInt(productIDRouting)}
                idTicketRecv={-1}
                handleNuevoTicket={handleNewTicketSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
