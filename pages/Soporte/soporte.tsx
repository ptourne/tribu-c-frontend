//Necesario para usar Hooks.
import React, { useState, useEffect } from "react";
import { Producto, Ticket } from "../../components/types";
import { ProductBar } from "../../components/soporte/ProductBar";

export default function Soporte() {
  const [products, setProducts] = useState<Array<Producto>>([]);

  const fetchProductos = (): Promise<Array<Producto>> => {
    //1) Llamanda al backend hacemos un GET de productos.
    return fetch("https://psa-soporte.eeoo.ar/products", {
      method: "GET",
      headers: {},
    }).then((res) => res.json());
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
        </div>
        <div id="BloqueProductBarEImagen">
          <ProductBar products={products} />
        </div>
      </div>
    </>
  );
}
