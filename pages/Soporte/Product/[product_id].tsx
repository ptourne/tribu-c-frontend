import { Producto, Ticket } from "@/pages/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import TicketActions, {
  TicketActionsProps,
} from "@/pages/Soporte/Componentes/TicketActions";
import { FormTicket } from "../Componentes/FormTicket";

//Pagina donde se muestran todos los ticket_id y esta el boton [+] para crear el nuevo ticket.
export default function Ticket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [productoSelect, setProductoSelect] = useState<Producto>();

  const fetchTickets = (): Promise<Array<Ticket>> => {
    //2) Llamanda al backend Necesitamos obtener todos los tickets.
    return fetch("https://psa-soporte.eeoo.ar/tickets").then((res) =>
      res.json()
    );
  };

  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const router = useRouter();
  const { product_id } = router.query;

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
      setProductoSelect(unProducto);
    });
    fetchTickets().then((ticketsFetch) => {
      const ticketsFiltradoById = ticketsFetch.filter(
        (ticket) => ticket.product_id == parseInt(productID)
      );
      setTickets(ticketsFiltradoById);
    });
  }, []);

  const [showFormFilter, setShowFormFilter] = useState(false); // Nuevo estado para controlar la visibilidad del formulario
  const handleOpenFormTicket = () => {
    if (showFormFilter === false) {
      setShowFormFilter(true); // Muestra el formulario al hacer clic en el botón
    } else {
      setShowFormFilter(false);
    }
  };
  
  //Cuando creamos el ticket vamos a pasar idTicket = -1.
  return (
    <>
      <div>
        <h1
          style={{ fontSize: "2.2em", marginLeft: "30px", marginTop: "10px" }}
        >
          {productoSelect?.name}
        </h1>
        <h1
          style={{ fontSize: "1.8em", marginLeft: "30px", marginTop: "-20px" }}
        >
          Versión: {productoSelect?.version}
          <button
            type="button"
            onClick={handleOpenFormTicket}
            id="buttonAgregarTicket"
          >
            +
          </button>
        </h1>
        <div style={{ position: "absolute", left: "800px" }}>
          {showFormFilter && (
            <FormTicket
              productIdNumerico={parseInt(productID)}
              idTicketRecv={-1}
            />
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
