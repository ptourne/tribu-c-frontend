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
  project_id: number;
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

interface Resource {
  legajo: number;
  Nombre: string;
  Apellido: string;
}

const resourcesTest: Resource[] = [
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
        handleUpdateResponsible()
        closeModal();
      } else {
        console.error("Error al asignar la tarea:", response.status);
      }
    } catch (error) {
      console.error("Error al asignar la tarea:", error);
    }
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
    </div>
  );
}

export default TicketPage;
