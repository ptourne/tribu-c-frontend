//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Recurso } from "../../types";
// import { ProductBar } from "./Componentes/ProductBar";

export default function Recurso() {
  // const [recursos, setRecursos] = useState<Array<Recurso>>([]);
  // const fetchRecursos = (): Array<Recurso> => {
    // Cambiar retorno a Promise<Array<Recurso>>
    // return fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos").then((res) =>
    //   res.json()
    // );
  //   const recursos: Recurso[] = [
  //     {
  //       legajo: 1,
  //       nombre: "Mario",
  //       apellido: "Mendoza"
  //     },
  //     {
  //       legajo: 2,
  //       nombre: "Maria",
  //       apellido: "Perez"
  //     },
  //     {
  //       legajo: 3,
  //       nombre: "Patricia",
  //       apellido:"Gaona"
  //     }
  //   ];
  //   return recursos
  // };

  // useEffect(() => {
  //   fetchRecursos().then((recursosFetch) => {
  //     setRecursos(recursosFetch);
  //   });
  // }, []);
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
    // Se redirige al calendario
    setSelectedRecurso(recursos[selectedIndex]);
  }, [recursos, selectedIndex]);


  return (
    <>
      <div>
        <h1>Hello world {
        recursos.map((usuario) => (
          <h2>usuario</h2>
        ))}</h1>
      </div>
    </>
  );
}
