import { Producto, Ticket } from "../../components/types";
import { useRouter } from "next/router";

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

  // cuando funcione tendremos que ir y darle a cada boton su correspondiente handler depnde en cual haga click. posiblmente su objeto Ticket correspondiente.
  //Se pasa la ruta absoluta y no la relativa !! no usar "." .ACA hacemos el ruteo .
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    //Para el ruteo generico de ticket  segun el producId (evitar crear Ticket/1.tsx, /2.tsx, /3.tsx...)
    //creamos un archivo [product_id].tsx en Ticket y usamos el ${productID} para hacer el parametro id generico.
    router.push(`/Soporte/Product/${productId}`);
  };

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
