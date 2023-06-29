import { Inter } from "next/font/google";
import axios from 'axios'
import { SERVER_NAME_PROYECTOS } from "../../../environments"
import ProjectInfoCard from "@/components/projectInfoCard";
import RecursoSideBar from "@/components/recursoSideBar";
import React, { Fragment, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Typography, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Recurso } from "../../types";
import RecursoInfoCard from "@/components/recursoInfoCard";
import ColumnaDia from "../Components/columnaDia";
import { BsArrowLeftShort } from "react-icons/bs";

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
export default function Calendario() {

  const handleLeftClick = () => {
    alert("Hii");
  }

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
      <div style={estilos.mainGrid} className="diasSemana flex justify-content-evenly">
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
                onClick={handleLeftClick}
              >
                <BsArrowLeftShort />
              </button>
            </Tooltip>
        <ColumnaDia nombreDia="Lunes" numeroDia="30"/>
        <ColumnaDia nombreDia="Martes" numeroDia="20"/>
        <ColumnaDia nombreDia="Miercoles" numeroDia="21"/>
        <ColumnaDia nombreDia="Jueves" numeroDia="22"/>
        <ColumnaDia nombreDia="Viernes" numeroDia="23"/>
      </div>

    </div>




    </>

  );
}
