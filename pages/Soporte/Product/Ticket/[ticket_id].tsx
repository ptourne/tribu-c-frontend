import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface Ticket {
  title: string;
  description: string;
  severity: string;
  priority: string;
  state: string;
  timeStart: string;
  type: string;
  supportTime: string;
  id: number;
  product_id: number;
  client_id: number;
  responsible_id: number;
}

function TicketPage() {
  const router = useRouter();
  const { ticket_id } = router.query;

  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://psa-soporte.eeoo.ar/ticket/${ticket_id}`
        );
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, []);

  return (
    <div className="px-8 py-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {ticket ? (
            <div>
              <div className="flex flex-row justify-between place-items-center">
                <h1 className="card-title">{ticket.title}</h1>

                <details className="dropdown mb-32">
                  <summary className="m-1 btn">
                    <FaEllipsisV />
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Modificar</a>
                    </li>
                    <li>
                      <a>Eliminar</a>
                    </li>
                    <li>
                      <a>Asignar</a>
                    </li>
                    <li>
                      <a>Finalizar</a>
                    </li>
                  </ul>
                </details>
              </div>

              <p className="mb-2">Descripcion: {ticket.description}</p>
              <p className="mb-2">Severity: {ticket.severity}</p>
              <p className="mb-2">Priority: {ticket.priority}</p>
              <p className="mb-2">State: {ticket.state}</p>
              <p className="mb-2">Time Start: {ticket.timeStart}</p>
              <p className="mb-2">Type: {ticket.type}</p>
              <p className="mb-2">Support Time: {ticket.supportTime}</p>
              <p className="mb-2">Product ID: {ticket.product_id}</p>
              <p className="mb-2">Client ID: {ticket.client_id}</p>
              <p className="mb-2">Responsible ID: {ticket.responsible_id}</p>
            </div>
          ) : (
            <p>Cargando ticket...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketPage;
