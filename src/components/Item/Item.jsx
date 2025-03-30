import "./Item.css";
import { Link } from "react-router-dom";
function Item({item}) {

    return (
        <div className="item-container">
            <Link to={`/detalle/${item.id}`}>
                <div className="item">
                    <img src={item.imagen} alt={item.nombre} />
                    <h3 className="item-nombre">{item.nombre}</h3>
                    <p className="item-descripcion">{item.descripcion}</p>
                        <p className="item-precio">${item.precio}</p>
                </div>
            </Link>
            </div>
    )
}

export default Item;