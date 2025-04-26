import { useAppContext } from "../../context/context";
import "./Item.css";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Item({ item }) {
  const { agregarAlCarrito } = useAppContext();

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(item, 1);
    toast.success('¡Producto agregado correctamente! 👾', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="item-container">
      <div className="item">
        <div className="item-content">
          <Link to={`/detalle/${item.id}`}>
            <img src={item.imagen} alt={item.nombre} />
            <h3 className="item-nombre">{item.nombre}</h3>
            <p className="item-descripcion">{item.descripcion}</p>
            <p className="item-precio">${item.precio}</p>
          </Link>
          <button 
            className="agregar-carrito-btn"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
