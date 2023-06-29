import { Cliente, Recurso, Ticket } from "@/pages/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ARRAY_CLIENTES } from "../../Componentes/Constantes";

const INITIAL_RECURSO = [
  { legajo: 1, Nombre: "Mario", Apellido: "Mendoza" },
  { legajo: 2, Nombre: "Maria", Apellido: "Perez" },
  { legajo: 3, Nombre: "Patricia", Apellido: "Gaona" },
];

function TicketUrgente() {
  const router = useRouter();
  //El product_id este argumento generico tiene que concindir con el tsx que creamos dentro de la carpeta TicketsUrgente.
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [recursos, setRecurso] = useState<Array<Recurso>>(INITIAL_RECURSO);
  const [clientes, setClientes] = useState<Array<Cliente>>(ARRAY_CLIENTES);

  const obtenerNombreCliente = (idCliente: number): string => {
    const unCliente = clientes.find((unCliente) => unCliente.id == idCliente);
    if (unCliente) {
      return unCliente.razon_social;
    }
    return "CLIENTE-DESCONOCIDO";
  };

  const obtenerNombreRecurso = (idRecurso: number): string => {
    const recurso = recursos.find((unRecurso) => unRecurso.legajo == idRecurso);
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "LEGAJO - DESCONOCIDO";
  };

  const { product_id } = router.query;
  console.log(product_id);
  const productID: string = typeof product_id === "string" ? product_id : "-1";
  console.log(`productID : ${productID} `);

  const fetchTicketsByID = (): Promise<Array<Ticket>> => {
    const URLGetTickesById = `https://psa-soporte.eeoo.ar/tickets/product/${parseInt(
      productID
    )}`;
    return fetch(URLGetTickesById, { method: "GET", headers: {} }).then(
      (response) => response.json()
    );
  };

  // por primera vez entra aca
  useEffect(() => {
    fetchTicketsByID().then((ticketsFetch) => {
      const ticketsFiltroPorHoraMin = ticketsFetch.filter(
        (unTicket) => parseInt(unTicket.supportTime) <= 2
      );
      setTickets(ticketsFiltroPorHoraMin);
    });
  }, []);

  return (
    <>
      <h1> Ricardo my bro</h1>
      <ul style={{ marginTop: "30px", width: "800px" }}>
        {tickets.map((unTicket) => (
          <li
            key={unTicket.id}
            id="LiTicketForAProductUrgent"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <h1 id="tituloH1Blanco">{unTicket.title}</h1>
              <p id="LetraGrande">
                <strong>Horas Restantes: {unTicket.supportTime} </strong>
              </p>

              <p>
                <strong>Descripción:</strong> {unTicket.description}
              </p>
              <p>
                <strong>Inicio:</strong> {unTicket.timeStart}
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
            <div
              style={{
                position: "absolute",
                marginLeft: "300px",
                marginTop: "0px",
              }}
            ></div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TicketUrgente;
