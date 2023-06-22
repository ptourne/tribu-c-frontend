//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Producto, Ticket } from "../types";
import { ProductBar } from "./Componentes/ProductBar";

export default function Soporte() {
  //Usado similiar al constructor inicia con INITIAL_STATE
  const [products, setProducts] = useState<Array<Producto>>([]);
  const fetchProductos = (): Promise<Array<Producto>> => {
    //1) Llamanda al backend hacemos un GET de productos.
    return fetch("https://psa-soporte.eeoo.ar/products").then((res) =>
      res.json()
    );
  };

  useEffect(() => {
    fetchProductos().then((productos) => {
      setProducts(productos);
    });
  }, []);

  return (
    <>
      <ProductBar products={products} />
    </>
  );
}
