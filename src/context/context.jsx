import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(item, cantidad) {
    const nuevoProducto = {
      ...item,
      cantidad,
    };

    if (carrito.some((e) => e.id === item.id)) {
      const nuevoCarrito = carrito.map((x) => {
        if (x.id === item.id) {
          return {
            ...x,
            cantidad: x.cantidad + cantidad,
          };
        } else {
          return x;
        }
      });

      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, nuevoProducto]);
    }
  };

  function eliminarDelCarrito(id) {
    const nuevoCarrito = carrito.filter((x) => x.id !== id);
    setCarrito(nuevoCarrito);
  };

  function vaciarCarrito() {
    setCarrito([]);
  };

  return (
    <AppContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {props.children}
    </AppContext.Provider>
  );
};
