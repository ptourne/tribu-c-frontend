import { Inter } from "next/font/google";
import axios from 'axios'
import ProjectInfoCard from "@/components/projectInfoCard";
import RecursoSideBar from "@/components/recursoSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Recurso } from "../types";
import RecursoInfoCard from "@/components/recursoInfoCard";
import { useRouter } from "next/router";
import { RECURSOS_URL } from "@/environments";
const inter = Inter({ subsets: ["latin"] });

export default function Recurso() {
  const [loading, setLoading] = useState(true);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const getRecursos = async () => {
    try {
      const response = await fetch(
        RECURSOS_URL + "recurso"
      );
      const data = await response.json();
      setRecursos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  useEffect(() => {
    getRecursos();
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-1 h-full flex-col p-4 bg-white w-30">
        <div className="flex">
          <h1 className="text-black mb-5 font-bold">Recursos</h1>
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
                <p className="mt-3">Cargando Recursos</p>
              </>
            : (recursos.length > 0
                ? recursos.map((recurso, index) => (
                    <RecursoInfoCard
                      key={index}
                      recurso={recurso}
                      onClick={() => {
                        // Redirigir al calendario
                        setSelectedIndex(index);
                        router.push({
                          pathname: `/Recursos/${recurso.legajo}`,
                          query: {
                            nombreRecurso: recurso.Nombre,
                            apellidoRecurso: recurso.Apellido,
                            legajo: recurso.legajo
                          }
                        });
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
