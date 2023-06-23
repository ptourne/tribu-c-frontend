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
  // EJ si tenemos http://localhost:3000/soporte/Ticket/2 entonces router.query contendra { product_id: "2" }
  // para acceder al 2 utilizamos product_id en router.query. en este caso pasamos el produc_id y los ticketsQuery

  const listaProductos = INITIAL_STATE_TICKETS; // EJMEPLO solo de juguete debe ser cambiado por un fetch.

  const { productVersion, productName, product_id } = router.query;
  const CLIENTE_ID = 1;
  const RESPONSIBLE_ID = 1;

  console.log(product_id);
  let productID: string = "INICIADO";
  if (typeof product_id === "string") {
    productID = product_id;
  }

  const handleClickAgregarTicket = (
    productID: string,
    clientId: number,
    responsibleId: number,
    idTicket: number
  ) => {
    console.log("El tamanio de la lista es " + idTicket);
    console.log(`producID :-${productID}- `);
    router.push({
      pathname: `/Soporte/Ticket/AgregarTicket/${productID}`,
      query: { clientId, responsibleId, idTicket },
    });
  };

  return (
    <>
      <div></div>
      <div>
        <h1
          style={{ fontSize: "2.2em", marginLeft: "30px", marginTop: "20px" }}
        >
          {productName}{" "}
        </h1>
        <h1 style={{ fontSize: "1.8em", marginLeft: "30px" }}>
          Versión: {productVersion}{" "}
          <button
            type="button"
            onClick={() => {
              handleClickAgregarTicket(
                productID,
                CLIENTE_ID,
                RESPONSIBLE_ID,
                listaProductos.length + 1
              );
            }}
            id="buttonAgregarTicket"
          >
            +
          </button>
        </h1>
        <ul style={{ marginTop: "30px", width: "800px" }}>
          {listaProductos.map((ticketDecod) => (
            <li key={ticketDecod.id} id="LiTicketForAProduct">
              <div style={{ marginBottom: "10px" }}>
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
    </>
  );
}
