import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchData } from "../../fetchData";
import Item from "../Item/Item";
import { PacmanLoader } from "react-spinners";
import "./ItemListContainer.css";

function ItemListContainer() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);

    const { tipo } = useParams();

    useEffect(() => {
        if (!items){
            fetchData()
            .then(data => {
                setItems(data);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch(err => console.log(err));
        }
        else{
            setLoading(false);
        }
    }, [tipo]);

    return (

        loading ? <PacmanLoader color="#2c3e50" /> :

            <div className="container-items">
                {
                    tipo ? 

                    items.filter(item => item.tipo === tipo || item.categoria === tipo).map(item => (
                        <Item key={item.id} item={item} />
                    ))

                    :

                    items.map(item => (
                        <Item key={item.id} item={item} />
                    ))
                }
            </div>
    )
}

export default ItemListContainer;