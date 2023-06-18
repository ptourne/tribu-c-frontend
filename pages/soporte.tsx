import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Producto } from "./types";

// Importamentos el paquete para el ruteo
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  product: Producto;
}

const ProductBar = ({ product }: Props) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/ticket");
  };

  return (
    <div className="flex flex-column justify-start text-primary-emphasis border bg-primary-subtle rounded-3 p-4 my-4">
      <div className="flex flex-row justify-start align-items-center">
        <div className="flex-grow-0 p-2 text-xl font-bold">
          {product.nombre}
        </div>
        <div className="flex-grow p-2 text-xl">Version {product.version}</div>
      </div>
      <div className="flex flex-row justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md"
          onClick={handleButtonClick}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default function Productos() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getProducts = async () => {
    const products: Producto[] = [
      {
        id: "1",
        nombre: "FIUBA",
        version: 1,
      },
      {
        id: "2",
        nombre: "FIUBA",
        version: 2,
      },
      {
        id: "3",
        nombre: "FADU",
        version: 1,
      },
    ];

    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-fill col-md-40 h-full w-full flex-col p-4 bg-white w-30">
        <h1 className="text-black text-4xl mb-20 font-bold">Productos</h1>
        <div className="text-black">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductBar key={index} product={product} />
            ))
          ) : (
            <p>
              Aún no hay productos creados. Seleccione agregar para crear uno
              nuevo.
            </p>
          )}
        </div>
      </div>
      <div className="col-md-782 flex-fill h-full"></div>
    </div>
  );
}
