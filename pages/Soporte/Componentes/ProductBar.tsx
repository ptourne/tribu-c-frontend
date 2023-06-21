import { Producto } from "@/pages/types";
import { useRouter } from "next/router";
interface ProductBarProps {
  products: Array<Producto>;
}

// ProductBar es un componente funcional que recibe un argumento del tipo Props (unicamente Array de Producto ) si agregamos una propiedad mas en props
// la debemos agregar como argumento tambien al productBar si tenemos 500 propiedades en Props debemos tener 500 argums entonces.

// public JSXElement[] ProductBar(ProductBarProps arrayProductos, String unaPropiedadMas){...}
export const ProductBar: React.FC<ProductBarProps> = ({ products }) => {
  // cuando funcione tendremos que ir y darle a cada boton su correspondiente handler depnde en cual haga click. posiblmente su objeto Ticket correspondiente.
  const router = useRouter();
  //Se pasa la ruta absoluta y no la relativa !! no usar "." .
  //ACA hacemos el ruteo .
  const handleButtonClick = () => {
    router.push("/Soporte/Ticket/ticket");
  };

  //public JSX.Element[] renderProductBar( ){...}
  const renderProductBar = (): JSX.Element[] => {
    return products.map((unProducto) => {
      return (
        <li key="{unProducto}">
          <h2> Mi id es :{unProducto.id} </h2>
          <h2> Mi nombre es: {unProducto.nombre} </h2>
          <h2> Mi version es: {unProducto.version} </h2>
          <button onClick={handleButtonClick}> Entrar </button>
        </li>
      );
    });
  };
  return <ul> {renderProductBar()} </ul>;
};
