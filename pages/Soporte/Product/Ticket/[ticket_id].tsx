import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FormTicket } from "../../Componentes/FormTicket";

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

interface Assignment {
  task_id: number;
  project_id: number;
  id: number;
  ticket_id: number;
}

interface DropdownItem {
  label: string;
  onClick: () => void;
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

const INITIALTICKET = {
  title: "",
  description: "",
  severity: "",
  priority: "",
  state: "",
  timeStart: "",
  type: "",
  supportTime: "",
  id: 0,
  product_id: 0,
  client_id: 0,
  responsible_id: 0,
};

function TicketPage() {
  const router = useRouter();
  const { ticket_id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket>(INITIALTICKET);
  const [product, setProduct] = useState<Product | null>(null);
  const [taskId, setTaskId] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);

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

    if (ticket.product_id) {
      fetchProduct();
    }
  }, [ticket, showForm]);

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

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `https://psa-soporte.eeoo.ar/assignments/ticket/${ticket_id}`
        );
        const data = await response.json();

        setAssignments(data);
      } catch (error) {
        console.error(
          "Error al obtener las tareas asociadas al ticket:",
          error
        );
      }
    };
    if (ticket_id) {
      fetchAssignments();
    }
  }, [ticket_id]);

  const handleDelete = async () => {
    try {
      await fetch(`https://psa-soporte.eeoo.ar/tickets/${ticket?.id}`, {
        method: "DELETE",
      });
      router.push(`/Soporte/Product/${ticket.product_id}`);
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
  const handleModificar = () => {
    try {
      setShowForm(true);
    } catch (error) {
      console.log(error + "Hubo error");
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

  const createAssignment = async () => {
    const assignmentData = {
      task_id: taskId,
      project_id: selectedProjectId,
    };

    try {
      const response = await fetch(
        `https://psa-soporte.eeoo.ar/assignments/ticket/${ticket_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assignmentData),
        }
      );

      if (response.ok) {
        console.log("Asignacion ticket tarea creada exitosamente");
        const data = await response.json();
        // Actualizar el estado de las asignaciones
        const newAssignment = {
          task_id: taskId,
          project_id: parseInt(data.project_id),
          id: parseInt(data.id),
          ticket_id: parseInt(data.ticket_id),
        };
        setAssignments([...assignments, newAssignment]);
      } else {
        console.error("Error al asignar la tarea:", response.status);
      }
    } catch (error) {
      console.error("Error al asignar la tarea:", error);
    }
  };

  const handleAssignment = async () => {
    const taskData = {
      titulo: ticket.title,
      descripcion: ticket.description,
      tiempo_estimado_finalizacion: parseInt(ticket.supportTime),
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
        const data = await response.json();
        setTaskId(data.msg.id_tarea);
        /*handleUpdateResponsible();*/
        createAssignment();
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
      <div className="w-1/2 mr-2 bg-blue-400 shadow-xl rounded-lg">
        <div className="p-6">
          {ticket ? (
            <div>
              <div className="flex flex-row justify-between place-items-center">
                <h1 className="text-xl text-black font-bold">Ticket</h1>
              </div>

              <h1 className="text-xl text-white font-bold mb-4">
                {ticket.title}
              </h1>

              <p className="mb-2 text-white text-lg">
                Producto: {product?.name}
              </p>
              <p className="mb-2 text-white text-lg">
                Versión: {product?.version}
              </p>
              <p className="mb-2 text-white text-lg">
                Descripción: {ticket.description}
              </p>
              <p className="mb-2 text-white text-lg">
                Severidad: {ticket.severity}
              </p>
              <p className="mb-2 text-white text-lg">
                Prioridad: {ticket.priority}
              </p>
              <p className="mb-2 text-white text-lg">Estado: {ticket.state}</p>
              <p className="mb-2 text-white text-lg">
                Inicio: {ticket.timeStart}
              </p>
              <p className="mb-2 text-white text-lg">Tipo: {ticket.type}</p>
              <p className="mb-2 text-white text-lg">
                Tiempo para Resolución: {ticket.supportTime}
              </p>
              <p className="mb-2 text-white text-lg">
                Client ID: {ticket.client_id}
              </p>
              <p className="mb-2 text-white text-lg">
                Responsible ID: {ticket.responsible_id}
              </p>
              <div className="flex justify-center">
                <button className="px-4 py-2 m-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg" onClick={handleModificar}>
                  Modificar
                </button>
                <button className="px-4 py-2 m-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg" onClick={handleDelete}>
                  Eliminar
                </button>
                <button className="px-4 py-2 m-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg" onClick={openModal}>
                  Derivar
                </button>
                <button className="px-4 py-2 m-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg" onClick={handleUpdateState}>
                  Finalizar
                </button>
              </div>
            </div>
          ) : (
            <p>Cargando ticket...</p>
          )}
        </div>
      </div>

      <div className="w-1/2 ml-2 bg-white border-solid border-2 border-gray-200 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold">Tareas</h2>
          {assignments.map((assignment) => (
            <button
              key={assignment.id}
              className="text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-lg p-2 w-full mb-2"
              onClick={() =>
                router.push(`/proyectos/${assignment.project_id}/tareas`)
              }
            >
              Ver Tarea
            </button>
          ))}
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id="DivExternFormTicket"
        >
          <div className="bg-white p-8 rounded shadow-lg" id="modalContenido">
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

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Derivar</h2>

            <select
              className="block w-full max-w-xs p-2 mt-1 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="block w-full max-w-xs p-2 mt-1 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded mt-4 mx-2"
              >
                Cerrar
              </button>

              <button
                onClick={handleAssignment}
                className="bg-gray-500  hover:bg-gray-400 text-white px-4 py-2 rounded mt-4 mx-2"
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
