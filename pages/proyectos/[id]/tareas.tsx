import { Tarea } from "@/pages/types";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import { SERVER_NAME_PROYECTOS } from "../environments";
import ProjectInfoCard from "@/components/projectInfoCard";
import ProjectSideBar from "@/components/projectSideBar";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Proyecto } from "./types";
import TaskInfoCard from "@/components/taskInfoCard";
import TaskSideBar from "@/components/taskSideBar";

const inter = Inter({ subsets: ["latin"] });

export default function Tareas() {
  const router = useRouter();
  const { id } = router.query; // Access the task ID from the route parameter

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [getTasksError, setGetTasksError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Tarea | undefined>(
    undefined
  );

  /*
  id
  titulo
  descripcion
  tiempo_estimado_fin
  horas_acumuladas
  estado
  prioridad
*/

  const getTasks = async () => {
    // Tareas de prueba hasta que tengamos conexión con el back-end
    const tasks: Tarea[] = [
      {
        id: "1",
        titulo: "Primer Tarea",
        descripcion: "Descripción de Primer Tarea",
        tiempo_estimado_fin: 1,
        estado: 0,
        horas_acumuladas: 10,
      },
      {
        id: "2",
        titulo: "Segundo Tarea",
        descripcion: "Descripción de Segundo Tarea",
        tiempo_estimado_fin: 1,
        estado: 0,
        horas_acumuladas: 20,
      },
      {
        id: "30",
        titulo: "Tercer Tarea",
        descripcion: "Descripción de Tercer Tarea",
        tiempo_estimado_fin: 1,
        estado: 1,
        horas_acumuladas: 30,
      },
    ];

    setTasks(tasks);
    setLoading(false);
    /*
    axios
      .get(SERVER_NAME_PROYECTOS + "tasks")
      .then((data) => {
        if (data.data.ok) {
          data.data.msg.forEach((task: Tarea) => {
            task.fecha_inicio = new Date(task.fecha_inicio);
            task.fecha_fin_estimada = new Date(task.fecha_fin_estimada);
          });
          setTasks(data.data.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          console.log(err.response.data.msg);
        }
        setLoading(false);
        setGetTasksError("Hubo un error al obtener los proyectos");
      });
      */
  };

  const addTask = () => {
    setSelectedTask(undefined);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setSelectedTask(tasks[selectedIndex]);
  }, [tasks, selectedIndex]);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-1 h-full flex-col p-4 bg-white w-30">
        <div className="flex">
          <h1 className="text-black mb-5 font-bold">Tareas</h1>
          <Tooltip
            title={<Typography fontSize={15}>Nuevo Tarea</Typography>}
            placement="right"
          >
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center mb-5 ml-4 space-x-4"
              onClick={() => {
                addTask();
              }}
            >
              <MdAdd />
            </button>
          </Tooltip>
        </div>
        <div
          className={
            loading
              ? "flex justify-content-center align-items-center flex-column"
              : tasks.length > 0
              ? "flex h-full flex-col space-y-4 text-black"
              : "text-black"
          }
        >
          {loading ? (
            <>
              <CircularProgress></CircularProgress>
              <p className="mt-3">Cargando Tareas</p>
            </>
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskInfoCard
                key={index}
                task={task}
                onClick={() => {
                  setSelectedIndex(index);
                }}
                selected={selectedIndex === index}
              />
            ))
          ) : (
            "Aún no hay proyectos creados. Seleccione agregar para crear uno nuevo"
          )}
        </div>
      </div>
      <div className="col-md-6 flex flex-col h-full">
        {<TaskSideBar task={selectedTask} />}
      </div>
    </div>
  );
}
