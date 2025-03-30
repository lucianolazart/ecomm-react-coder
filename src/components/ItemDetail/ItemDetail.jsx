import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchData } from "../../fetchData";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
function ItemDetail() {

    const params = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData()
        .then(data => {

            const item = data.find(item => item.id === parseInt(params.id));
            setItem(item);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
        .catch(err => console.log(err));
    }, [params.id]);

    return (
        loading ? <PacmanLoader color="#2c3e50" /> :

        <>
        <div className="item-detail">
            <img src={item.imagen} alt={item.nombre} />
            <h1>{item.nombre}</h1>
            <p>Precio: ${item.precio}</p>
            <p>Stock: {item.stock}</p>
            <p>Descripción: {item.descripcion}</p>
        <ItemCount stock={item.stock} />

        <Link to="/">
            <button className="btn-volver">Volver</button>
        </Link>
        </div>
        </>
    )
}

export default ItemDetail;