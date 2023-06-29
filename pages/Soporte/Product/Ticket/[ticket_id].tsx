import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FormTicket } from "../../Componentes/FormTicket";
import { version } from "os";
import { Ticket, Producto, Tarea, Cliente } from "@/pages/types";
import { ARRAY_CLIENTES } from "../../Componentes/Constantes";

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

//Pagina donde se muestra las tareas y por completo el ticket con su ABM correspondiente

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

interface Recurso {
  Nombre: string;
  legajo: number;
  Apellido: string;
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

const INITIAL_RECURSO = [
  { legajo: 1, Nombre: "Mario", Apellido: "Mendoza" },
  { legajo: 2, Nombre: "Maria", Apellido: "Perez" },
  { legajo: 3, Nombre: "Patricia", Apellido: "Gaona" },
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
  const [recursos, setRecursos] = useState<Array<Recurso>>(INITIAL_RECURSO);
  const [clientes, setClientes] = useState<Array<Cliente>>(ARRAY_CLIENTES);

  const obtenerNombreCliente = (idCliente: number): string => {
    const unCliente = clientes.find((unCliente) => unCliente.id == idCliente);
    if (unCliente) {
      return unCliente.razon_social;
    }
    return "CLIENTE-DESCONOCIDO";
  };

  const obtenerNombreRecurso = (idRecurso: string): string => {
    const idRecursoInt = parseInt(idRecurso);
    const recurso = recursos.find(
      (unRecurso) => unRecurso.legajo == idRecursoInt
    );
    if (recurso) {
      return `${recurso.Nombre}  ${recurso.Apellido}`;
    }
    return "LEGAJO-DESCONOCIDO";
  };

  //filter hace una busqueda te devuelve un array si queres filtras mas intenso y quedarte solo con un elemento apriori sabiendo que solo habra 1 usa find! .
  // el project con id=1 esta asocaido al producto con id=!  pero ademas cada tarea tiene que estar asociado a un ticket en particular  !!!
  const ticketIdNew: string = typeof ticket_id === "string" ? ticket_id : "0";

  /*
  const fetchRecursos = (): Promise<Array<Recurso>> => {
    const URLFetchecurso = `https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos`;

    return fetch(URLFetchecurso, {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
  };
  //ESto no funciona  hay que cambiarlo por lo que hara recursos en un futuro . 
  
  

   useEffect(() => {
    fetchRecursos().then((recursosFetch) => {
      setRecursos(recursosFetch);
    });
  }, []);

  */

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
      <div id="container">
        <span id="divInfoTicketExterno">
          <div id="divInfoTicketInterno">
            <h2>{ticket.title}</h2>
            <p>
              <strong>Producto: </strong> {product?.name}
            </p>
            <p>
              <strong>Version:</strong> {product?.version}
            </p>
            <p>
              <strong>Descripcion:</strong> {ticket.description}
            </p>
            <p>
              <strong>Severidad:</strong> {ticket.severity}
            </p>
            <p>
              <strong>Prioridad:</strong> {ticket.priority}
            </p>
            <p>
              <strong>Estado:</strong> {ticket.state}
            </p>
            <p>
              <strong>Inicio: </strong> {ticket.timeStart}
            </p>
            <p>
              <strong>Tipo: </strong> {ticket.type}
            </p>
            <p>
              <strong>Horas Restantes:</strong> {ticket.supportTime}
            </p>
            <p>
              <strong>Client ID:</strong>
              {obtenerNombreCliente(ticket.client_id)}
            </p>
            <p>
              <strong>Responsable:</strong>
              {obtenerNombreRecurso(ticket.responsible_id.toString())}
            </p>
          </div>
          <div id="DivBotones">
            <button
              type="button"
              onClick={handleModificar}
              id="buttonOpcionTicket"
            >
              <a>Modificar</a>
            </button>
            <button
              type="button"
              onClick={handleDelete}
              id="buttonOpcionTicket"
            >
              <a>Eliminar</a>
            </button>
            <button type="button" onClick={openModal} id="buttonOpcionTicket">
              <a>Derivar</a>
            </button>
            <button
              type="button"
              onClick={handleUpdateState}
              id="buttonOpcionTicket"
            >
              <a>Finalizar</a>
            </button>
          </div>
        </span>
        <span id="divTareas">
          <ul>
            {taskToSHow.map((unaTask) => (
              <li key={unaTask.id_tarea}>
                <h4 id="tituloTask"> {unaTask.titulo}</h4>
                <p>
                  <strong>Descripcion: </strong> {unaTask.descripcion}
                </p>
                <p>
                  <strong> Desorralladores de la tarea: </strong>
                  {obtenerNombreRecurso(unaTask.responsable)}
                </p>
                <p>
                  <strong>Horas Acumuladas: </strong> {unaTask.horas_acumuladas}
                  <strong id="StrongSeparado">
                    Horas Estimadas para finalizar:{" "}
                  </strong>
                  {unaTask.tiempo_estimado_fin}
                </p>
              </li>
            ))}
          </ul>
        </span>
        {showForm && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            id="DivExternFormTicket"
          >
            <div className="bg-white p-8 rounded shadow-lg">
              <FormTicket
                productIdNumerico={ticket.product_id}
                idTicketRecv={ticket.id}
              />
              <button
                type="button"
                id="buttonOpcionTicket"
                onClick={() => {
                  setShowForm(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
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
    </>
  );
}

export default TicketPage;
