import { Inter } from "next/font/google";
import axios from 'axios'
import ProjectInfoCard from "@/components/projectInfoCard";
import RecursoSideBar from "@/components/recursoSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import RecursoInfoCard from "@/components/recursoInfoCard";
import { useRouter } from "next/router";
import TarjetaTarea from "./Components/tarjetaTarea";
import ColumnaDia from "./Components/columnaDia";
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
    height: "500px",
    width: "100%",
  },

  columnas: {
    width: "100%",
  },

  mes: {
    width: "50%",
    marginBottom: "1%",
  },
  filas: {
    margin: "10px"
  }

};
export default function Calendario() {
    const router = useRouter();
    const { nombreRecurso, apellidoRecurso, legajo } = router.query;

  return (
    <><div style={estilos.calendario} className="calendario">
      <div style={estilos.mes} className="mes flex justify-content-between">

        <div className="display-6">
          {nombreRecurso}
        </div>
        <div className="display-6">
          Julio
        </div>
      </div>
      {/* {<div style={estilos.diasSemana} className="diasSemana flex justify-content-evenly">
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
      </div>} */}
      <div style={estilos.mainGrid} className="diasSemana flex">
        <ColumnaDia nombreDia="Lunes" numeroDia="30"/>
        <ColumnaDia nombreDia="Martes" numeroDia="20"/>
        <ColumnaDia nombreDia="Miercoles" numeroDia="21"/>
        <ColumnaDia nombreDia="Jueves" numeroDia="22"/>
        <ColumnaDia nombreDia="Viernes" numeroDia="23"/>
        {/* {<div className="diasSemana-contenido border-2 border-dark rounded-2" style={estilos.columnas}>
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
        </div>} */}
      </div>

    </div>




    </>

  );
}
