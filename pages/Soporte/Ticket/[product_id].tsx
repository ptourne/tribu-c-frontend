import { Ticket } from "@/pages/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const INITIAL_STATE_TICKETS = [
  {
    title: "Actualizacion de calculo de prioridad 1 ",
    description: "Se quiere actualizar el calculo",
    severity: "LS1",
    priority: "Alta",
    state: "Abierto",
    timeStart: "01-06-2023 18:40",
    type: "Empresa grande",
    supportTime: "24H",
    id: 1,
    product_id: 1,
    client_id: 1,
    responsible_id: 1,
  },

  {
    title: "Actualización de cálculo de prioridad 2",
    description: "Se requiere mejorar el algoritmo de cálculo de prioridad",
    severity: "LS2",
    priority: "Media",
    state: "Abierto",
    timeStart: "02-06-2023 09:15",
    type: "Empresa chica",
    supportTime: "8H",
    id: 2,
    product_id: 1,
    client_id: 2,
    responsible_id: 2,
  },
  {
    title: "Actualización de interfaz de usuario",
    description: "Se requiere mejorar la usabilidad y diseño de la interfaz",
    severity: "LS3",
    priority: "Baja",
    state: "Abierto",
    timeStart: "03-06-2023 14:30",
    type: "Empresa grande",
    supportTime: "16H",
    id: 3,
    product_id: 2,
    client_id: 1,
    responsible_id: 3,
  },
];

export default function Ticket() {
  const router = useRouter();
  // IMPORTANTE ACA EL NOMBRE DE LA VARIABLE! Porque ? -> en router.query los nombres de la variable deben
  // coincidir con los parametros de la ruta especificada (product_id.tsx)
  // EJ si tenemos http://localhost:3000/Soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery
  const { product_id } = router.query;
  const listaProductos = INITIAL_STATE_TICKETS; // EJMEPLO solo de juguete debe ser cambiado por un fetch.

  return (
    <div>
      <h1>Estoy en -{product_id}- </h1>
      <ul>
        {listaProductos.map((ticketDecod) => (
          <li key={ticketDecod.id} id="LiTicketForAProduct">
            <p>
              Titulo: {ticketDecod.title}
              Descripcion: {ticketDecod.description}
              Severidad: {ticketDecod.severity}
              Prioridad: {ticketDecod.priority}
              Estado: {ticketDecod.state}
              Tiempo de inicio: {ticketDecod.timeStart}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
