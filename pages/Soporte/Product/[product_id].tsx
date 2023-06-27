import { Producto, Ticket } from "@/pages/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import TicketActions, {
  TicketActionsProps,
} from "@/pages/Soporte/Componentes/TicketActions";
import { FormTicket } from "../Componentes/FormTicket";

export default function Ticket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [productVersion, setProductVersion] = useState<Number>(0);
  const [productName, setProductName] = useState<String>("productName");
  const fetchTickets = (): Promise<Array<Ticket>> => {
    //2) Llamanda al backend Necesitamos obtener todos los tickets.
    return fetch("https://psa-soporte.eeoo.ar/tickets").then((res) =>
      res.json()
    );
  };

  const router = useRouter();
  // Agrega el estado para decodedTickets
  // IMPORTANTE ACA EL NOMBRE DE LA VARIABLE! Porque ? -> en router.query los nombres de la variable deben
  // coincidir con los parametros de la ruta especificada (product_id.tsx)
  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const { product_id } = router.query;

  //const productVersion, productName,

  console.log(`product_id: ${product_id}`);
  let productID: string = "INICIADO";
  if (typeof product_id === "string") {
    productID = product_id;
  }
  const fetchGetProductosById = (): Promise<Producto> => {
    //1) Llamanda al backend hacemos un GET de productos los id van en number recuerda !
    return fetch(`https://psa-soporte.eeoo.ar/product/${parseInt(productID)}`, {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetchGetProductosById().then((unProducto) => {
      setProductName(unProducto.name);
      setProductVersion(unProducto.version);
    });
    fetchTickets().then((ticketsFetch) => {
      const ticketsFiltradoById = ticketsFetch.filter(
        (ticket) => ticket.product_id == parseInt(productID)
      );
      setTickets(ticketsFiltradoById);
    });
  }, []);

  const [showFormTicket, setShowFormTicket] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

  const handleOpenFormTicket = () => {
    if (showFormTicket === false) {
      setShowFormTicket(true); // Muestra el formulario al hacer clic en el botón
    } else {
      setShowFormTicket(false);
    }
  };

  //codigo theo  eliminar---------------------------------
  const handleCloseFormTicket = () => {
    setShowFormTicket(false); // Oculta el formulario al cerrarlo
  };

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const handleUpdateTitle = (ticketId: number, newTitle: string) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, title: newTitle } : ticket
    );
    setTickets(updatedTickets); // Actualiza el estado de decodedTickets
    console.log("Ticket title updated:", ticketId, newTitle);
  };
  const handleUpdateDescription = (
    ticketId: number,
    newDescription: string
  ) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, description: newDescription }
        : ticket
    );
    setTickets(updatedTickets); // Actualiza el estado de decodedTickets
    console.log("Ticket description updated:", ticketId, newDescription);
  };
  const handleDeleteTicket = (ticketId: number) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets); // Actualiza el estado de decodedTickets
    console.log("Ticket deleted:", ticketId);
  };
  const handleResolveTicket = (ticketId: number) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, state: "resolved" } : ticket
    );
    setTickets(updatedTickets); // Actualiza el estado de decodedTickets
    console.log("Ticket resolved:", ticketId);
  };
  const handleDelegateTicket = (ticketId: number, assignedTo: string) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, assignedTo: assignedTo } : ticket
    );
    setTickets(updatedTickets); // Actualiza el estado de decodedTickets
    console.log("Ticket delegated:", ticketId, assignedTo);
  };
  const ticketActionsProps: TicketActionsProps = {
    onUpdateTitle: handleUpdateTitle,
    onUpdateDescription: handleUpdateDescription,
    onDeleteTicket: handleDeleteTicket,
    onResolveTicket: handleResolveTicket,
    onDelegateTicket: handleDelegateTicket,
    ticket: selectedTicketId
      ? tickets.find((ticket) => ticket.id === selectedTicketId) ?? null
      : null,
  };
  //codigo theo  eliminar--------------------

  return (
    <>
      <div>
        <h1
          style={{ fontSize: "2.2em", marginLeft: "30px", marginTop: "10px" }}
        >
          {productName}
        </h1>
        <h1
          style={{ fontSize: "1.8em", marginLeft: "30px", marginTop: "-20px" }}
        >
          Versión: {productVersion.toString()}
          <button
            type="button"
            onClick={handleOpenFormTicket}
            id="buttonAgregarTicket"
          >
            +
          </button>
        </h1>
        <div style={{ position: "absolute", left: "800px" }}>
          {showFormTicket && (
            <FormTicket productIdNumerico={parseInt(productID)} />
          )}
        </div>
        <ul style={{ marginTop: "30px", width: "800px" }}>
          {tickets.map((unTicket) => (
            <li
              key={unTicket.id}
              id="LiTicketForAProduct"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <p>
                  <strong>Título:</strong> {unTicket.title}
                </p>
                <p>
                  <strong>Descripción:</strong> {unTicket.description}
                </p>
                <p>
                  <strong>Estado:</strong> {unTicket.state}
                </p>
                <p>
                  <strong>Severidad:</strong> {unTicket.severity}
                </p>
                <p>
                  <strong>Prioridad:</strong> {unTicket.priority}
                </p>
                <p>
                  <strong>Fecha inicio:</strong> {unTicket.timeStart}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  marginLeft: "300px",
                  marginTop: "0px",
                }}
              >
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
      </div>
    </>
  );
}
