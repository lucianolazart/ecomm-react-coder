import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchData } from "../../fetchData";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/context";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function ItemDetail() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(0);
  const { agregarAlCarrito } = useAppContext();

  const itemsCollection = collection(db, "productos");

  useEffect(() => {
    getDocs(itemsCollection).then(snapshot => {
      const items = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      const item = items.find((item) => item.id === params.id);
      setItem(item);
      setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0) {
      agregarAlCarrito(item, cantidad);
    }
  };

  return loading ? (
    <PacmanLoader color="#2c3e50" />
  ) : (
    <>
      <div className="item-detail">
        <img src={item.imagen} alt={item.nombre} />
        <h1>{item.nombre}</h1>
        <p>Precio: ${item.precio}</p>
        <p>Stock: {item.stock}</p>
        <p>Descripción: {item.descripcion}</p>
        <ItemCount stock={item.stock} onCountChange={setCantidad} />

        <button 
          className="btn-volver" 
          onClick={handleAgregarAlCarrito}
          disabled={cantidad === 0}
        >
          Agregar al carrito
        </button>
        <Link to="/">
          <button className="btn-volver">Volver</button>
        </Link>
      </div>
    </>
  );
}

export default ItemDetail;
