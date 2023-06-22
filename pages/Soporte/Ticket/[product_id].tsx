import { Ticket } from "@/pages/types";
import { useRouter } from "next/router";

export default function Ticket() {
  const router = useRouter();
  // IMPORTANTE ACA EL NOMBRE DE LA VARIABLE! Porque ? -> en router.query los nombres de la variable deben
  // coincidir con los parametros de la ruta especificada (product_id.tsx)
  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const { productVersion, productName, product_id, ticketsQuery } = router.query;
  let decodedTickets: Ticket[] = [];
  if (typeof ticketsQuery === "string") {
    decodedTickets = ticketsQuery
      ? JSON.parse(decodeURIComponent(ticketsQuery))
      : [];
  }

  console.log(product_id);

  return (
    <div>
       <h1 style={{ fontSize: "2.2em", marginLeft: "30px", marginTop: "20px"}}>{productName} </h1>
       <h1 style={{ fontSize: "1.8em", marginLeft: "30px" }}>Versión: {productVersion} </h1>
      <ul style={{ marginTop: "30px",  width: "800px" }}>
        {decodedTickets.map((ticketDecod) => (
          <li key={ticketDecod.id} id="LiTicketForAProduct">
            <div style={{ marginBottom: "10px"}}>
            <p>
              <strong>Título:</strong> {ticketDecod.title}
            </p>
            <p>
              <strong>Descripción:</strong> {ticketDecod.description}
            </p>
            <p>
              <strong>Estado:</strong> {ticketDecod.state}
            </p>
            <p>
              <strong>Severidad:</strong> {ticketDecod.severity}
            </p>
            <p>
              <strong>Prioridad:</strong> {ticketDecod.priority}
            </p>
            <p>
              <strong>Fecha inicio:</strong> {ticketDecod.timeStart}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}
/*{decodedTickets.map((ticket) => (
          <li key={ticket.id}>
            <p>Título: {ticket.title}</p>
            <p>Descripción: {ticket.description}</p>
            
          </li>
        ))} */
