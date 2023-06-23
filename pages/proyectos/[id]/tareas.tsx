import { Tarea } from "@/pages/types";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import { SERVER_NAME_PROYECTOS } from "../../../environments";
import ProjectInfoCard from "@/components/projectInfoCard";
import ProjectSideBar from "@/components/projectSideBar";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Proyecto } from "../../types";
import TaskInfoCard from "@/components/taskInfoCard";
import TaskSideBar from "@/components/taskSideBar";
import { BsArrowLeftShort } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Tareas() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [getTasksError, setGetTasksError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Tarea | undefined>(
    undefined
  );

  const returnToProjects = () => {
    router.push({
      pathname: `/proyectos`,
    });
  };

  const getTasks = async () => {
    if (id) {
      axios
        .get(SERVER_NAME_PROYECTOS + "projects/" + id.toString() + "/tasks")
        .then((data) => {
          if (data.data.ok) {
            data.data.msg.forEach((task: Tarea) => {});
            data.data.msg.forEach((task: Tarea) => {
              task.estado = 1;
            });
            setTasks(data.data.msg);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setGetTasksError("Hubo un error al obtener las tareas");
        });
    }
  };

  useEffect(() => {
    if (id) {
      getTasks();
    }
  }, [id]);

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
          <Tooltip
            title={
              <Typography fontSize={15}>
                Volver al panel de proyectos
              </Typography>
            }
            placement="bottom"
          >
            <button
              type="button"
              className="btn d-flex align-items-center justify-content-center mb-5 mr-4"
              onClick={() => {
                returnToProjects();
              }}
            >
              <BsArrowLeftShort />
            </button>
          </Tooltip>
          <h1 className="text-black mb-5 font-bold">Tareas</h1>
          <Tooltip
            title={<Typography fontSize={15}>Nueva Tarea</Typography>}
            placement="right"
          >
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center mb-5 ml-4"
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
            "Aún no hay tareas creadas. Seleccione agregar para crear una nueva"
          )}
        </div>
      </div>
      <div className="col-md-6 flex flex-col h-full">
        {
          <TaskSideBar
            task={selectedTask}
            project_id={id}
            getTasksFunction={getTasks}
          />
        }
      </div>
    </div>
  );
}
