import { Inter } from "next/font/google";
import axios from 'axios'
import { SERVER_NAME_PROYECTOS } from "../environments"
import ProjectInfoCard from "@/components/projectInfoCard";
import ProjectSideBar from "@/components/projectSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Proyecto } from "./types";

const inter = Inter({ subsets: ["latin"] });

export default function Proyectos() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [getProjectsError, setGetProjectsError] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Proyecto | undefined>(
    undefined
  );

  const getProjects = async () => {
    // Proyectos de prueba hasta que tengamos conexión con el back-end
    /*const projects: Proyecto[] = [
      {
        id: "1",
        nombre: "Primer Proyecto",
        fecha_inicio: new Date(2023, 2, 1), // March 1, 2023
        fecha_fin: new Date(2023, 2, 15), // March 15, 2023
        estado: "En curso",
        horas_consumidas: 15,
        costo_proyecto: 50000,
      },
      {
        id: "2",
        nombre: "Segundo Proyecto",
        fecha_inicio: new Date(2023, 2, 10), // March 10, 2023
        fecha_fin: new Date(2024, 1, 28), // February 28, 2024
        estado: "En curso",
        horas_consumidas: 8,
        costo_proyecto: 70000,
      },
      {
        id: "30",
        nombre: "Tercer Proyecto",
        fecha_inicio: new Date(2023, 3, 1), // April 1, 2023
        fecha_fin: new Date(2024, 1, 15), // February 15, 2024
        estado: "Finalizado",
        horas_consumidas: 40,
        costo_proyecto: 150000,
      },
    ];*/

    setProjects(projects);
    axios
      .get(SERVER_NAME_PROYECTOS + 'projects')
      .then((data) => {
        if (data.data.ok) {
          data.data.msg.forEach(project => {
            project.fecha_inicio = new Date(project.fecha_inicio);
            project.fecha_fin_estimada = new Date(project.fecha_fin_estimada);
          });
          setProjects(data.data.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          console.log(err.response.data.msg)
        }
        setLoading(false);
        setGetProjectsError("Hubo un error al obtener los proyectos");
      })
  };

  const addProject = () => {
    setSelectedProject(undefined);
    setSelectedIndex(-1);
  }

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    setSelectedProject(projects[selectedIndex]);
  }, [projects, selectedIndex]);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-1 h-full flex-col p-4 bg-white w-30">
        <div className="flex">
          <h1 className="text-black mb-5 font-bold">Proyectos</h1>
          <Tooltip title={<Typography fontSize={15}>Nuevo Proyecto</Typography>} placement="right">
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center mb-5 ml-4 space-x-4"
              onClick={() => {
                addProject();
              }}
            >
              <MdAdd />
            </button>
          </Tooltip> 
        </div>
        <div
          className={
            loading ? "flex justify-content-center align-items-center flex-column"
            : (projects.length > 0
              ? "flex h-full flex-col space-y-4 text-black"
              : "text-black")
          }
        >
          {loading 
            ? <>
                <CircularProgress></CircularProgress>
                <p className="mt-3">Cargando Proyectos</p>
              </>
            : (projects.length > 0
                ? projects.map((project, index) => (
                    <ProjectInfoCard
                      key={index}
                      project={project}
                      onClick={() => {
                        setSelectedIndex(index);
                      }}
                      selected={selectedIndex === index}
                    />
                  ))
                : "Aún no hay proyectos creados. Seleccione agregar para crear uno nuevo")
          }
        </div>
      </div>
      <div className="col-md-6 flex flex-col h-full">
        {<ProjectSideBar project={selectedProject} />}
      </div>
    </div>
  );
}
