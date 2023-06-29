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
   
  filas: {
    margin: "10px",
    minHeight:"70px"
  },
  recursos:{
    fontSize:"30px",
    fontWeight:"bold",
    paddingLeft:"20px",
    paddingTop:"20px;"
   
  }

};
export default function recurso3() {


  return (
    <>
    <div style={estilos.recursos} className="recursos"> Recursos </div>
    <div  style={estilos.filas} className="  d-flex flex-column   bd-highlight mb-3">
       
      <div  style={estilos.filas} className="mes  border-2 border-dark rounded-2 ">

        Maria de la Rosa
        
      </div>
      <div  style={estilos.filas} className="mes  border-2 border-dark rounded-2 ">

        Jorge Gomez
        
      </div>
      <div   style={estilos.filas} className="mes  border-2 border-dark rounded-2 ">

        Marcelo Perez
        
      </div>
      </div>


    </>

  );
}
