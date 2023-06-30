//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Producto, Ticket } from "../types";
import { ProductBar } from "./Componentes/ProductBar";
import { Modal } from "react-bootstrap";

export default function Soporte() {
  //Usado similiar al constructor inicia con INITIAL_STATE
  const [verImagen, setVerImagen] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<Producto>>([]);
  const fetchProductos = (): Promise<Array<Producto>> => {
    //1) Llamanda al backend hacemos un GET de productos.
    console.log("products SON:----- ");
    return fetch("https://psa-soporte.eeoo.ar/products").then((res) =>
      res.json()
    );
  };

  const handleReporte = () => {
    if (!verImagen) {
      setVerImagen(true);
    } else {
      setVerImagen(false);
    }
  };

  useEffect(() => {
    fetchProductos().then((productosFetch) => {
      setProducts(productosFetch);
    });
  }, []);

  return (
    <>
      <div id="containerInicio">
        <div id="tituloInicioContainer">
          <h1 id="TituloH1Inicio"> Productos </h1>
          <button type="button" onClick={handleReporte} id="buttonReportes">
            Reporte de Tickets
          </button>
        </div>
        <div id="BloqueProductBarEImagen">
          <ProductBar products={products} />
          {verImagen && (
            <img src="https://github.com/ptourne/tribu-c-frontend/blob/main/public/reportes.jpeg?raw=true" />
          )}
        </div>
      </div>
    </>
  );
}
