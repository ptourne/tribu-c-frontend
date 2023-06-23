import { Inter } from "next/font/google";
import axios from "axios";
import { SERVER_NAME_PROYECTOS } from "../environments";
import ProjectInfoCard from "@/components/projectInfoCard";
import ProjectSideBar from "@/components/projectSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Proyecto } from "./types";

const inter = Inter({ subsets: ["latin"] });

export default function Proyectos() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [getProjectsError, setGetProjectsError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Proyecto | undefined>(
    undefined
  );

  const getProjects = async () => {
    setProjects(projects);
    axios
      .get(SERVER_NAME_PROYECTOS + "projects")
      .then((data) => {
        if (data.data.ok) {
          data.data.msg.forEach((project: Proyecto) => {
            project.fecha_inicio = project.fecha_inicio
              ? new Date(project.fecha_inicio)
              : null;
            project.fecha_fin_estimada = project.fecha_fin_estimada
              ? new Date(project.fecha_fin_estimada)
              : null;
          });
          setProjects(data.data.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          console.log(err.response.data.msg);
        }
        setLoading(false);
        setGetProjectsError("Hubo un error al obtener los proyectos");
      });
  };

  const addProject = () => {
    setSelectedProject(undefined);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    setSelectedProject(projects[selectedIndex]);
  }, [projects, selectedIndex]);

  return (
    <div className="d-flex flex-row">
      <div className="d-flex flex-fill col-md-1 flex-col p-4 bg-white w-30">
        <div className="d-flex">
          <h1 className="text-black mb-5 font-bold">Proyectos</h1>
          <Tooltip
            title={<Typography fontSize={15}>Nuevo Proyecto</Typography>}
            placement="right"
          >
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
            loading
              ? "d-flex justify-content-center align-items-center flex-column"
              : projects.length > 0
              ? "d-flex flex-col space-y-4 text-black overflow-y-auto"
              : "text-black"
          }
        >
          {loading ? (
            <>
              <CircularProgress></CircularProgress>
              <p className="mt-3">Cargando Proyectos</p>
            </>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectInfoCard
                key={index}
                project={project}
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
        {
          <ProjectSideBar
            project={selectedProject}
            getProjectsFunction={getProjects}
          />
        }
      </div>
    </div>
  );
}
