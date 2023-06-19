import { Inter } from "next/font/google";
import axios from 'axios'
import { SERVER_NAME_PROYECTOS } from "../environments"
import ProjectInfoCard from "@/components/projectInfoCard";
import RecursoSideBar from "@/components/projectSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Recurso } from "./types";
import RecursoInfoCard from "@/components/recursoInfoCard";

const inter = Inter({ subsets: ["latin"] });

export default function recurso() {
  const [loading, setLoading] = useState(true);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [getProjectsError, setGetProjectsError] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRecurso, setSelectedRecurso] = useState<Recurso | undefined>(
    undefined
  );

  const getRecursos = async () => {
    const recursos: Recurso[] = [
        {
          nombre: "1",
          apellido: "Primer Recurso",
          legajo: 234, // March 1, 2023
        
        },
        {
            nombre: "2",
            apellido: "segundo recurso",
            legajo: 234, // March 1, 2023
        },
         
      ]; 
    setRecursos(recursos);
    setLoading(false);
    
  };

  const addRecurso = () => {
    setSelectedRecurso(undefined);
    setSelectedIndex(-1);
  }

  useEffect(() => {
    getRecursos();
  }, []);

  useEffect(() => {
    setSelectedRecurso(recursos[selectedIndex]);
  }, [recursos, selectedIndex]);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-1 h-full flex-col p-4 bg-white w-30">
        <div className="flex">
          <h1 className="text-black mb-5 font-bold">Recursos</h1>
          <Tooltip title={<Typography fontSize={15}>Nuevo Recurso</Typography>} placement="right">
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center justify-content-center mb-5 ml-4 space-x-4"
              onClick={() => {
                addRecurso();
              }}
            >
              <MdAdd />
            </button>
          </Tooltip> 
        </div>
        <div
          className={
            loading ? "flex justify-content-center align-items-center flex-column"
            : (recursos.length > 0
              ? "flex h-full flex-col space-y-4 text-black"
              : "text-black")
          }
        >
          {loading 
            ? <>
                <CircularProgress></CircularProgress>
                <p className="mt-3">Cargando Proyectos</p>
              </>
            : (recursos.length > 0
                ? recursos.map((recurso, index) => (
                    <RecursoInfoCard
                      key={index}
                      recurso={recurso}
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
      </div>
  );
}
