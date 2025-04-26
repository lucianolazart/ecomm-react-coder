import { useAppContext } from "../../context/context";
import "./Item.css";
import { Link } from "react-router-dom";
function Item({ item }) {
  const { agregarAlCarrito } = useAppContext();

  return (
    <div className="item-container">
      <div className="item">
        <Link to={`/detalle/${item.id}`}>
          <img src={item.imagen} alt={item.nombre} />
          <h3 className="item-nombre">{item.nombre}</h3>
          <p className="item-descripcion">{item.descripcion}</p>
          <p className="item-precio">${item.precio}</p>
        </Link>
        <button 
          className="agregar-carrito-btn"
          onClick={() => agregarAlCarrito(item, 1)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default Item;
