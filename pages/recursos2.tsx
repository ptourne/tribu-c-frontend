import { Inter } from "next/font/google";
import axios from 'axios'
import { SERVER_NAME_PROYECTOS } from "../environments"
import ProjectInfoCard from "@/components/projectInfoCard";
import RecursoSideBar from "@/components/recursoSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Recurso } from "./types";
import RecursoInfoCard from "@/components/recursoInfoCard";

const inter = Inter({ subsets: ["latin"] });

const estilos = {
  diasSemana: {

    backgroundColor: "white",


  },

  calendario: {
    width: "100%"
  },

  mainGrid: {
    gap: "2%",
    height: "500px"
  },

  columnas: {
    width: "100%"
  },

  mes: {
    width: "50%"
  },
  filas: {
    margin: "10px"
  }

};
export default function recurso2() {


  return (
    <><div style={estilos.calendario} className="calendario">
      <div style={estilos.mes} className="mes flex justify-content-between">

        <div className="display-6">
          Maria Rosa
        </div>
        <div className="display-6">
          Julio
        </div>
      </div>
      <div style={estilos.diasSemana} className="diasSemana flex justify-content-evenly">
        <div className="diasSemana-contenido">
          Lunes 19
        </div>
        <div className="diasSemana-contenido">
          Martes 20
        </div>
        <div className="diasSemana-contenido">
          Miercoles 21
        </div>
        <div className="diasSemana-contenido">
          Jueves 22
        </div>
        <div className="diasSemana-contenido">
          Viernes 23
        </div>
      </div>
      <div style={estilos.mainGrid} className="diasSemana flex justify-content-evenly    ">
        <div className="diasSemana-contenido border-2 border-dark rounded-2" style={estilos.columnas}>
          <div className="d-flex flex-column   bd-highlight mb-3">
            <div style={estilos.filas} className="p-2 bd-highlight border-2 border-dark rounded-1  ">Codear BackEnd</div>
            <div style={estilos.filas} className="p-2 bd-highlight border-2 border-dark rounded-1">Armar flujo de conversacion</div>
            <div style={estilos.filas} className="p-2 bd-highlight border-2 border-dark rounded-1">Configuracion de base de datos</div>
          </div>
        </div>
        <div className="diasSemana-contenido border-2 border-dark rounded-2" style={estilos.columnas}>
          Martes 20
        </div>
        <div className="diasSemana-contenido border-2 border-dark rounded-2" style={estilos.columnas}>
          Miercoles 21
        </div>
        <div className="diasSemana-contenido border-2 border-dark rounded-2" style={estilos.columnas}>
          Jueves 22
        </div>
        <div className="diasSemana-contenido  border-2 border-dark rounded-2" style={estilos.columnas}>
          Viernes 23
        </div>
      </div>

    </div>




    </>

  );
}
