import { Cliente, Producto, Ticket } from "../../../components/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { ARRAY_CLIENTES } from "../../../components/soporte/Constantes";
import { FormTicket } from "../../../components/soporte/FormTicket";

interface Recurso {
  Nombre: string;
  legajo: number;
  Apellido: string;
}

//Pagina donde se muestran todos los ticket_id y esta el boton [+] para crear el nuevo ticket.
const INITIAL_RECURSO = [
  { legajo: 1, Nombre: "Mario", Apellido: "Mendoza" },
  { legajo: 2, Nombre: "Maria", Apellido: "Perez" },
  { legajo: 3, Nombre: "Patricia", Apellido: "Gaona" },
];

export default function Ticket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [productoSelect, setProductoSelect] = useState<Producto>();
  const [recursos, setRecurso] = useState<Array<Recurso>>(INITIAL_RECURSO);
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

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

  const obtenerNombreRecurso = (idRecurso: number): string => {
    const recurso = recursos.find((unRecurso) => unRecurso.legajo == idRecurso);
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "LEGAJO - DESCONOCIDO";
  };

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
  const productID: string =
    typeof product_id === "string" ? product_id : "VACIO";

  useEffect(() => {
    console.log("Entro al unico userEffect de [product_id].tsx");
    const fetchGetProductosById = (): Promise<Producto> => {
      //1) Llamanda al backend hacemos un GET de productos los id van en number recuerda !
      return fetch(
        `https://psa-soporte.eeoo.ar/product/${parseInt(productID)}`,
        {
          method: "GET",
          headers: {},
        }
      ).then((res) => res.json());
    };

    fetchClientes().then((clientesFetch) => {
      setClientes(clientesFetch);
    });

    fetchGetProductosById().then((unProducto) => {
      setProductoSelect(unProducto);
    });

    fetchTickets().then((ticketsFetch) => {
      const ticketsFiltradoById = ticketsFetch.filter(
        (ticket) => ticket.product_id == parseInt(productID)
      );
      setTickets(ticketsFiltradoById);
    });
  }, [tickets]); //el product_id cambia muchas veces asi que hacemos un UE por esa variable.

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
                router.push(`/Soporte/Product/TicketsUrgente/${productID}`)
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
                    <strong>Inicio:</strong> {unTicket.timeStart}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {unTicket.type}
                  </p>
                  <p>
                    <strong>Horas Restantes:</strong> {unTicket.supportTime}
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
                productIdNumerico={parseInt(productID)}
                idTicketRecv={-1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
