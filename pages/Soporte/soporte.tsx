//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Producto, Ticket } from "../types";
import { ProductBar } from "./Componentes/ProductBar";

const INITIAL_STATE_PRODUCTS = [
  {
    id: 1,
    name: "FIUBA",
    version: "1",
  },
  {
    id: 2,
    name: "FIUBA",
    version: "2",
  },
  {
    id: 3,
    name: "FADU",
    version: "1",
  },
];

const INITIAL_STATE_TICKETS = [
  {
    title: "Actualizacion de calculo de prioridad 1 ",
    description: "Se quiere actualizar el calculo",
    severity: "LS1",
    priority: "Alta",
    state: "Abierto",
    timeStart: "01-06-2023 18:40",
    type: "Empresa grande",
    supportTime: "24H",
    id: 1,
    product_id: 1,
    client_id: 1,
    responsible_id: 1,
  },

  {
    title: "Actualización de cálculo de prioridad 2",
    description: "Se requiere mejorar el algoritmo de cálculo de prioridad",
    severity: "LS2",
    priority: "Media",
    state: "Abierto",
    timeStart: "02-06-2023 09:15",
    type: "Empresa chica",
    supportTime: "8H",
    id: 2,
    product_id: 1,
    client_id: 2,
    responsible_id: 2,
  },
  {
    title: "Actualización de interfaz de usuario",
    description: "Se requiere mejorar la usabilidad y diseño de la interfaz",
    severity: "LS3",
    priority: "Baja",
    state: "Abierto",
    timeStart: "03-06-2023 14:30",
    type: "Empresa grande",
    supportTime: "16H",
    id: 3,
    product_id: 2,
    client_id: 1,
    responsible_id: 3,
  },
];

export default function Soporte() {
  //Usado similiar al constructor inicia con INITIAL_STATE
  //
  const [products, setProducts] = useState<Array<Producto>>([]);
  const fetchProductos = (): Promise<Array<Producto>> => {
    return fetch(
      "https://abrahamosco.github.io/prueba.github.io/prueba.html"
    ).then((res) => res.json());
  };

  const [tickets, setTickets] = useState<Array<Ticket>>(INITIAL_STATE_TICKETS);

  useEffect(() => {
    fetchProductos().then((productos) => {
      console.log(productos);
      setProducts(productos);
    });
  }, []);

  return (
    <>
      <ProductBar products={products} tickets={tickets} />
    </>
  );
}
