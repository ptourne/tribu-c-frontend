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
  calendario: {
    width: "100%"
  },

  mainGrid: {
    gap: "2%",
    width: "98%",
    marginLeft: "1%",
  },
  mes: {
    width: "50%",
    margin: "1%",
    marginBottom: "1%",
  },
};
export default function Calendario() {
    const date = new Date();
    const router = useRouter();
    const { nombreRecurso, apellidoRecurso, legajo } = router.query;

  return (
    <><div style={estilos.calendario} className="calendario">
      <div style={estilos.mes} className="mes flex justify-content-between">
        <div className="display-6">
          {nombreRecurso}
        </div>
        <div className="display-6">
          {numeroAMes(date.getMonth())}
        </div>
      </div>
      <div style={estilos.mainGrid} className="diasSemana flex">
        <ColumnaDia nombreDia="Lunes" numeroDia= {diaCorrespondiente(date, 1)}/>
        <ColumnaDia nombreDia="Martes" numeroDia={diaCorrespondiente(date, 2)}/>
        <ColumnaDia nombreDia="Miercoles" numeroDia={diaCorrespondiente(date, 3)}/>
        <ColumnaDia nombreDia="Jueves" numeroDia={diaCorrespondiente(date, 4)}/>
        <ColumnaDia nombreDia="Viernes" numeroDia={diaCorrespondiente(date, 5)}/>
      </div>
    </div>
    </>
  );
}

function diaCorrespondiente(fecha: Date, diaSemana: number) {
  var diaActual = new Date(fecha);
  diaActual.setDate(fecha.getDate() + (diaSemana - fecha.getDay()));
  return diaActual.getDate()
}

function numeroAMes(numero: number) {
    switch (numero) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
    } 
}