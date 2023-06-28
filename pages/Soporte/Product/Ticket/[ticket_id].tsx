import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FormTicket } from "../../Componentes/FormTicket";
import { version } from "os";
import { Ticket, Producto, Tarea } from "@/pages/types";

const INITIAL_STATE_PRODUCT = {
  name: "UnNombre",
  version: "0.0",
  id: 0,
};
const INITIAL_STATE_TICKET = {
  title: "Nuevo Titulo",
  description: "Nueva Descripcion",
  severity: "",
  priority: "",
  state: "Iniciado",
  timeStart: "",
  type: "",
  supportTime: "",
  id: 0,
  product_id: 0,
  client_id: 0,
  responsible_id: 0,
};

interface TaskProps {
  id_tarea: string;
  id_project: string;
  titulo: string;
  descripcion: string;
  tiempo_estimado_fin: number;
  horas_acumuladas: number;
  estado: number;
  responsable: string;
  id_ticket: number;
}

const INITIAL_STATE_TASK = [
  {
    id_tarea: "15",
    id_project: "1",
    titulo: "obtener la funcion de densidad",
    descripcion:
      "segun la muestra de alumno debemos calcular la densidad de probabilidad",
    tiempo_estimado_fin: 40,
    horas_acumuladas: 10,
    estado: 0,
    responsable: "1",
    id_ticket: 13,
  },
  {
    id_tarea: "16",
    id_project: "1",
    titulo: "Implementar funcionalidad de autenticación",
    descripcion:
      "Desarrollar un sistema de autenticación para permitir el acceso seguro a la aplicación",
    tiempo_estimado_fin: 60,
    horas_acumuladas: 20,
    estado: 1,
    responsable: "2",
    id_ticket: 13,
  },
  {
    id_tarea: "17",
    id_project: "1",
    titulo: "Agregar función de generación de reportes",
    descripcion:
      "Permitir a los usuarios generar reportes personalizados a partir de los datos del sistema",
    tiempo_estimado_fin: 80,
    horas_acumuladas: 30,
    estado: 2,
    responsable: "3",
    id_ticket: 21,
  },
  {
    id_tarea: "18",
    id_project: "1",
    titulo: "Optimizar algoritmo de búsqueda",
    descripcion:
      "El algoritmo actual de búsqueda es lento y necesita mejoras para mejorar la velocidad y precisión",
    tiempo_estimado_fin: 40,
    horas_acumuladas: 15,
    estado: 0,
    responsable: "2",
    id_ticket: 21,
  },
  {
    id_tarea: "19",
    id_project: "1",
    titulo: "Diseñar interfaz de usuario",
    descripcion:
      "Crear una interfaz de usuario atractiva y fácil de usar para mejorar la experiencia del usuario",
    tiempo_estimado_fin: 60,
    horas_acumuladas: 10,
    estado: 1,
    responsable: "1",
    id_ticket: 20,
  },
  {
    id_tarea: "55",
    id_project: "2",
    titulo: "Implementar sistema de pagos",
    descripcion:
      "Desarrollar un sistema de pagos en línea para permitir a los usuarios realizar transacciones de forma segura",
    tiempo_estimado_fin: 120,
    horas_acumuladas: 50,
    estado: 2,
    responsable: "4",
    id_ticket: 5,
  },
  {
    id_tarea: "36",
    id_project: "2",
    titulo: "Corregir errores de validación en el formulario de contacto",
    descripcion:
      "El formulario de contacto presenta problemas de validación que deben ser solucionados",
    tiempo_estimado_fin: 40,
    horas_acumuladas: 20,
    estado: 1,
    responsable: "2",
    id_ticket: 6,
  },
];

//Pagina donde se muestran el ABM de tickets Tareas y la asociacion de tareas.
function TicketPage() {
  const router = useRouter();
  const { ticket_id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket>(INITIAL_STATE_TICKET);
  const [product, setProduct] = useState<Producto>(INITIAL_STATE_PRODUCT);
  const [showForm, setShowForm] = useState(false);
  const [taskToSHow, setTaskToSHow] =
    useState<Array<TaskProps>>(INITIAL_STATE_TASK); //falta modificar el typedef de tarea atributo extra id_ticket

  //filter hace una busqueda te devuelve un array si queres
  //filtras mas intenso y quedarte solo con un elemento apriori sabiendo que solo habra 1 usa find! .
  // el project con id=1 esta asocaido al producto con id=!  pero ademas cada tarea tiene que estar asociado a un ticket
  //en particular  !!!
  const ticketIdNew: string = typeof ticket_id === "string" ? ticket_id : "0";
  console.log("ticket.product_id.toString()  " + ticket.product_id.toString());
  console.log("parseInt(ticketIdNew)   " + parseInt(ticketIdNew));

  useEffect(() => {
    const taskObtenidas = taskToSHow.filter(
      (unaTask) =>
        unaTask.id_project === ticket.product_id.toString() &&
        unaTask.id_ticket === parseInt(ticketIdNew)
    );

    console.log("taskObtenidas");
    console.log(taskToSHow);

    console.log("taskToSHow" + taskToSHow);
    console.log("ticketIdNew " + ticketIdNew);
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
  const handleModificar = () => {
    try {
      setShowForm(true);
    } catch (error) {
      console.log(error + "Hubo error");
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
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
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
                      <li onClick={handleModificar}>
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
            <ul>
              {taskToSHow.map((unaTask) => (
                <li key={unaTask.id_tarea}>
                  <hr />
                  <p id="TituloTask"> {unaTask.titulo} </p>
                  <p>Descripcion: {unaTask.descripcion} </p>
                  <p>Responsable: {unaTask.responsable}</p>
                  <p>Horas Acumuladas: {unaTask.horas_acumuladas}</p>
                  <p>
                    Tiempo Estimado para finalizar:{" "}
                    {unaTask.tiempo_estimado_fin}
                  </p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
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

      <div id="DivEnTicket">
        {showForm && (
          <FormTicket
            productIdNumerico={ticket.product_id}
            idTicketRecv={ticket.id}
          />
        )}
      </div>
    </>
  );
}

export default TicketPage;
