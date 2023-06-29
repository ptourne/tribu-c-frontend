import { Producto, Ticket } from "@/pages/types";
import { Select } from "@mui/material";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
interface ProductBarProps {
  products: Array<Producto>;
}
//PAGINA Donde esta el producto version y el boton entrar INICIO-

// ProductBar es un componente funcional que recibe un argumento del tipo Props (unicamente Array de Producto ) si agregamos una propiedad mas en props
// la debemos agregar como argumento tambien al productBar si tenemos 500 propiedades en Props debemos tener 500 argums entonces.
// public JSXElement[] ProductBar(ProductBarProps arrayProductos, String unaPropiedadMas){...}
export const ProductBar: React.FC<ProductBarProps> = ({ products }) => {
  if (!products) {
    products = [];
  }
  console.log("products SON: ");
  console.log(products);
  const [showFormTicket, setShowFormTicket] = useState(false); // Nuevo estado para controlar la visibilidad del formulario
  const handleOpenFormTicket = () => {
    if (showFormTicket === false) {
      setShowFormTicket(true); // Muestra el formulario al hacer clic en el botón
    } else {
      setShowFormTicket(false);
    }
  };

  <button
<<<<<<< HEAD
            type="button"
            onClick={handleOpenFormFiltro}
            id="buttonFiltrarProductos"
          ></button>
=======
    type="button"
    onClick={handleOpenFormTicket}
    id="buttonAgregarTicket"
  ></button>;
>>>>>>> 61991e6003f162bc1020c2845b753cee363fe966

  // cuando funcione tendremos que ir y darle a cada boton su correspondiente handler depnde en cual haga click. posiblmente su objeto Ticket correspondiente.
  //Se pasa la ruta absoluta y no la relativa !! no usar "." .ACA hacemos el ruteo .
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    //Para el ruteo generico de ticket  segun el producId (evitar crear Ticket/1.tsx, /2.tsx, /3.tsx...)
    //creamos un archivo [product_id].tsx en Ticket y usamos el ${productID} para hacer el parametro id generico.
    router.push(`/Soporte/Product/${productId}`);
  };

  //public JSX.Element[] renderProductBar( ){...} en cada map agregar la key.para evitar claves repetidas.project.fecha_inicio
  /*
  const renderProductBar = (): JSX.Element[] => {
    console.log("Entre al renderProducBar productos son: ");
    console.log(products);
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
*/
  return (
    <>
      <ul>
        {products.map((unProducto) => {
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
        })}
      </ul>
    </>
  );
};
