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

interface Product {
  name: string;
  version: string;
  id: number;
}

function TicketPage() {
  const router = useRouter();
  const { ticket_id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

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

    if (ticket_id) {
      fetchTicket();
    }
  }, [ticket_id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://psa-soporte.eeoo.ar/product/${ticket?.product_id}`
        );
        const dataProduct = await response.json();
        setProduct(dataProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (ticket?.product_id) {
      fetchProduct();
    }
  }, [ticket]);

  const handleDelete = async () => {
    try {
      await fetch(`https://psa-soporte.eeoo.ar/tickets/${ticket?.id}`, {
        method: "DELETE",
      });
      router.push(`/Soporte/Product/${ticket?.product_id}`);
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const handleUpdateState = async () => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        state: "Cerrado",
      };

      try {
        const response = await fetch(
          `https://psa-soporte.eeoo.ar/tickets/${ticket.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTicket),
          }
        );

        if (response.ok) {
          // Actualizar el estado del ticket localmente si la solicitud fue exitosa
          setTicket(updatedTicket);
          console.log("Ticket cerrado exitosamente");
        } else {
          console.error("Error al cerrar el ticket:", response.status);
        }
      } catch (error) {
        console.error("Error al cerrar el ticket:", error);
      }
    }
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex px-8 py-8">
      <div className="card w-1/2 mr-2 bg-base-100 shadow-xl">
        <div className="card-body">
          {ticket ? (
            <div>
              <div className="flex flex-row justify-between place-items-center">
                <h1 className="card-title">Ticket</h1>

                <div className="dropdown">
                  <label tabIndex={0} className="m-1 btn">
                    <FaEllipsisV />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Modificar</a>
                    </li>
                    <li onClick={handleDelete}>
                      <a>Eliminar</a>
                    </li>
                    <li onClick={openModal}>
                      <a>Derivar</a>
                    </li>
                    <li onClick={handleUpdateState}>
                      <a>Finalizar</a>
                    </li>
                  </ul>
                </div>
              </div>

              <h1 className="card-title">{ticket.title}</h1>

              <p className="mb-2">Producto: {product?.name}</p>
              <p className="mb-2">Version: {product?.version}</p>
              <p className="mb-2">Descripcion: {ticket.description}</p>
              <p className="mb-2">Severidad: {ticket.severity}</p>
              <p className="mb-2">Prioridad: {ticket.priority}</p>
              <p className="mb-2">Estado: {ticket.state}</p>
              <p className="mb-2">Inicio: {ticket.timeStart}</p>
              <p className="mb-2">Tipo: {ticket.type}</p>
              <p className="mb-2">
                Tiempo para Resolucion: {ticket.supportTime}
              </p>
              <p className="mb-2">Client ID: {ticket.client_id}</p>
              <p className="mb-2">Responsible ID: {ticket.responsible_id}</p>
            </div>
          ) : (
            <p>Cargando ticket...</p>
          )}
        </div>
      </div>

      <div className="card w-1/2 ml-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Tareas</h2>
          <p>Aca van las tareas asociadas al ticket</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Derivar</h2>

            <select className="select w-full max-w-xs my-1">
              <option disabled selected>
                Seleccionar Responzable
              </option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
            </select>

            <select className="select w-full max-w-xs my-1">
              <option disabled selected>
                Seleccionar Proyecto
              </option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded mt-4"
              >
                Cerrar
              </button>

              <button
                onClick={closeModal}
                className="bg-gray-500  hover:bg-gray-400 text-white px-4 py-2 rounded mt-4"
              >
                Asignar
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketPage;
