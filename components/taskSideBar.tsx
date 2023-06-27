import React, { useState, useEffect } from "react";
import TaskSideBarDetailsPane from "./taskSideBarDetailsPane";
import { useRouter } from "next/router";
import { Tarea } from "../pages/types";
import { RecursosDeTareasSideBar } from "@/pages/Recursos/Components/recursosDeTareasSideBar";
import { getTableRowUtilityClass } from "@mui/material";

interface TaskSideBarProps {
  task: Tarea | undefined;
  project_id: string;
  getTasksFunction: Function;
}

const ADD = 0;
const EDIT = 1;

function TaskSideBar({ task, project_id, getTasksFunction }: TaskSideBarProps) {
  const router = useRouter();
  const [mode, setMode] = useState(EDIT);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Tarea | undefined>(
    undefined
  );

  useEffect(() => {
    setSelectedTask(task);
    if (!task) {
      setMode(ADD);
    } else {
      setMode(EDIT);
    }
  }, [task]);

  const getTasks = () => {
    router.push({
      pathname: `/proyectos/${selectedTask?.id_tarea}/tareas`,
    });
  };

  return (
    <div className="d-flex flex-column flex-fill justify-content-start border rounded-3 m-3 p-3">
      <ul className="nav nav-tabs justify-content-center nav-fill">
        <li
          className="nav-item"
          onClick={() => {
            setSelectedTab(0);
          }}
        >
          <a
            className={selectedTab === 0 ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="#"
          >
            Detalles
          </a>
        </li>
        {mode === EDIT && (
          <li
            className="nav-item"
            onClick={() => {
              setSelectedTab(1);
            }}
          >
            <a
              className={selectedTab === 1 ? "nav-link active" : "nav-link"}
              href="#"
            >
              Recursos
            </a>
          </li>
        )}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className={
            selectedTab === 0
              ? "p-3 border rounded-bottom border-top-0 tab-pane fade show active"
              : "p-3 border rounded-bottom border-top-0 tab-pane fade show"
          }
          id="details-tab-pane"
          role="tabpanel"
          aria-labelledby="details-tab"
        >
          <TaskSideBarDetailsPane
            task={selectedTask}
            project_id={project_id}
            getTasksFunction={getTasksFunction}
          />
        </div>
        <div
          className={
            selectedTab === 1
              ? "border rounded-bottom border-top-0 tab-pane fade show active"
              : "border rounded-bottom border-top-0 tab-pane fade show"
          }
          id="resources-tab-pane"
          role="tabpanel"
          aria-labelledby="resources-tab"
        >
          <RecursosDeTareasSideBar tarea= {selectedTask}/>
        </div>
      </div>
      {mode === EDIT && (
        <button
          type="button"
          className="btn btn-primary mt-auto p-2"
          onClick={getTasks}
        >
          Ver Tareas
        </button>
      )}
    </div>
  );
}

export default TaskSideBar;
