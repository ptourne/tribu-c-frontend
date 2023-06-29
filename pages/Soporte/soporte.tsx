//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Producto, Ticket } from "../types";
import { ProductBar } from "./Componentes/ProductBar";

export default function Soporte() {
  //Usado similiar al constructor inicia con INITIAL_STATE
  const [products, setProducts] = useState<Array<Producto>>([]);
  const fetchProductos = (): Promise<Array<Producto>> => {
    //1) Llamanda al backend hacemos un GET de productos.
    console.log("products SON:----- ");
    return fetch("https://psa-soporte.eeoo.ar/products").then((res) =>
      res.json()
    );
  };

  const handleReporte = () => {
    console.log("Click en reporte.");
    <div>
      <img src={'/public/reportes.jpeg'} alt="Mi imagen" />
    </div>
  }
  

  useEffect(() => {
    fetchProductos().then((productosFetch) => {
      setProducts(productosFetch);
    });
  }, []);

  return (
    <>
    
      <h1 id="tituloH1"> Productos </h1>
      <button
            type="button"
            onClick={handleReporte}
            id="buttonReportes"
          >
            Reporte de Tickets
          </button>
      <ProductBar products={products} />
      
    </>
    
  );
}
