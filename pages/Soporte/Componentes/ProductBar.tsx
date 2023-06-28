import { Producto, Ticket } from "@/pages/types";
import { Select } from "@mui/material";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
interface ProductBarProps {
  products: Array<Producto>;
}



// ------------------------------------------------------------------------------------ //



const handleFiltrarProducto = () => {
  try {
    console.log("Filtrando por producto.");
  } catch (error) {
    console.log(error + "Hubo error");
  }
};


const handleFiltrarVersion = () => {
  try {
    console.log("Filtrando por version.");
  } catch (error) {
    console.log(error + "Hubo error");
  }
};



<div className="flex flex-row justify-between place-items-center">
  <h1 className="card-title">Ticket</h1>
    <div className="dropdown">
      <label tabIndex={0} className="m-1 btn">
        <FaEllipsisV />
      </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
        <li onClick={handleFiltrarProducto}>
          <a>Filtrar por producto</a>
        </li>
        <li onClick={handleFiltrarVersion}>
          <a>Filtrar por version</a>
        </li>
        </ul>
    </div>
</div>






// ------------------------------------------------------------------------------------ //






// ProductBar es un componente funcional que recibe un argumento del tipo Props (unicamente Array de Producto ) si agregamos una propiedad mas en props
// la debemos agregar como argumento tambien al productBar si tenemos 500 propiedades en Props debemos tener 500 argums entonces.
// public JSXElement[] ProductBar(ProductBarProps arrayProductos, String unaPropiedadMas){...}
export const ProductBar: React.FC<ProductBarProps> = ({ products }) => {
  // cuando funcione tendremos que ir y darle a cada boton su correspondiente handler depnde en cual haga click. posiblmente su objeto Ticket correspondiente.
  //Se pasa la ruta absoluta y no la relativa !! no usar "." .ACA hacemos el ruteo .
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    console.log(`Producto ID: ${productId}`);

    //Para el ruteo generico de ticket  segun el producId (evitar crear Ticket/1.tsx, /2.tsx, /3.tsx...)
    //creamos un archivo [product_id].tsx en Ticket y usamos el ${productID} para hacer el parametro id generico.

    router.push(`/Soporte/Product/${productId}`);
  };

  //public JSX.Element[] renderProductBar( ){...} en cada map agregar la key.para evitar claves repetidas.project.fecha_inicio
  const renderProductBar = (): JSX.Element[] => {
    return products.map((unProducto) => {
      return (
        <li key={unProducto.id} id="LiProducBar">
          <p>
            {unProducto.name} <br />
            VERSION: {unProducto.version}
            <br />
          </p>
          <button
            onClick={() => {
              handleProductClick(unProducto.id);
            }}
          >
            Entrar
          </button>
        </li>
      );
    });
  };
  return <ul> {renderProductBar()} </ul>;
};
