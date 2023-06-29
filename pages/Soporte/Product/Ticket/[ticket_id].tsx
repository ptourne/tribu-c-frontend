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

interface Project {
  codigo: number;
  costo_estimado: number;
  customizacion: string;
  estado: number;
  fecha_fin_estimada: string;
  fecha_inicio: string;
  horas_consumidas: number;
  id_cliente: number;
  id_producto: number;
  nombre: string;
  ultima_tarea: number;
  version: string;
}

interface Recurso {
  legajo: number;
  Nombre: string;
  Apellido: string;
}

const resourcesTest: Recurso[] = [
  {
    legajo: 1,
    Nombre: "Mario",
    Apellido: "Mendoza",
  },
  {
    legajo: 2,
    Nombre: "Maria",
    Apellido: "Perez",
  },
  {
    legajo: 3,
    Nombre: "Patricia",
    Apellido: "Gaona",
  },
  {
    legajo: 4,
    Nombre: "Marcos",
    Apellido: "Rivero",
  },
];

const INITIAL_STATE_TASK = {};

function TicketPage() {
  const router = useRouter();
  const { ticket_id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket>(INITIAL_STATE_TICKET);
  const [product, setProduct] = useState<Producto>(INITIAL_STATE_PRODUCT);
  const [showForm, setShowForm] = useState(false);
  const [recursos, setRecursos] = useState<Array<Recurso>>(resourcesTest);
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

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://tribu-c-proyectos-backend.onrender.com/projects"
        );
        const data = await response.json();

        setProjects(data.msg);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, [ticket]);

  /*const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://psa-recursos.eeoo.ar/recurso"
        );
        const data = await response.json();

        setResources(data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, [ticket]);*/

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

  const handleUpdateResponsible = async () => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        responsible_id: selectedResourceId,
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

  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = parseInt(event.target.value);
    setSelectedProjectId(selectedProjectId);
  };

  const [selectedResourceId, setSelectedResourceId] = useState<number>(0);

  const handleResourceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedResourceId = parseInt(event.target.value);
    setSelectedResourceId(selectedResourceId);
  };

  const handleAssignment = async () => {
    const taskData = {
      titulo: ticket?.title,
      descripcion: ticket?.description,
      tiempo_estimado_finalizacion: ticket?.supportTime,
      legajo_responsable: selectedResourceId,
    };

    try {
      const response = await fetch(
        `https://tribu-c-proyectos-backend.onrender.com/projects/${selectedProjectId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (response.ok) {
        console.log("Tarea asignada exitosamente");
        handleUpdateResponsible();
        closeModal();
      } else {
        console.error("Error al asignar la tarea:", response.status);
      }
    } catch (error) {
      console.error("Error al asignar la tarea:", error);
    }
  };

  const handleModificar = () => {
    try {
      setShowForm(true);
    } catch (error) {
      console.log(error + "Hubo error");
    }
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
              <a> modificar </a>
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
          <ul></ul>
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
                onClick={() => {
                  setShowForm(false);
                }}
                id="buttonOpcionTicket"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Derivar</h2>

            <select
              className="select w-full max-w-xs my-1"
              onChange={handleResourceChange}
              value={selectedResourceId || ""}
            >
              <option disabled value="">
                Seleccionar Recurso
              </option>
              {resourcesTest.map((resource) => (
                <option key={resource.legajo} value={resource.legajo}>
                  {resource.Nombre}, {resource.Apellido}
                </option>
              ))}
            </select>

            <select
              className="select w-full max-w-xs my-1"
              onChange={handleProjectChange}
              value={selectedProjectId || ""}
            >
              {" "}
              <option disabled value="">
                Seleccionar Proyecto
              </option>
              {projects.map((project) => (
                <option key={project.codigo} value={project.codigo}>
                  {project.nombre}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded mt-4"
              >
                Cerrar
              </button>
              <button
                onClick={handleAssignment}
                className="bg-gray-500  hover:bg-gray-400 text-white px-4 py-2 rounded mt-4"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketPage;
/*
Diseño de lista de tareas. 
Codigo abraham: 
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
*/
