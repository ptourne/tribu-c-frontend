import { Ticket } from "@/pages/types";
import { useRouter } from "next/router";

export default function Ticket() {
  const router = useRouter();
  // IMPORTANTE ACA EL NOMBRE DE LA VARIABLE! Porque ? -> en router.query los nombres de la variable deben
  // coincidir con los parametros de la ruta especificada (product_id.tsx)
  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const { product_id, ticketsQuery } = router.query;
  let decodedTickets: Ticket[] = [];
  if (typeof ticketsQuery === "string") {
    decodedTickets = ticketsQuery
      ? JSON.parse(decodeURIComponent(ticketsQuery))
      : [];
  }

  console.log(product_id);

  return (
    <div>
      <h1>Estoy en -{product_id}- </h1>
      <h1> Estoy recibiendo cadena codificada {ticketsQuery} </h1>
      <h1> Estoy decodificando la cadena</h1>
      <ul>
        {decodedTickets.map((ticketDecod) => (
          <li key={ticketDecod.id} id="LiTicketForAProduct">
            <p>
              Titulo: {ticketDecod.title}
              Descripcion: {ticketDecod.description}
            </p>
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
