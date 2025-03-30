import { useState } from 'react';
import './ItemCount.css'

function ItemCount({stock}) {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }
    
    return (
        <>
            <div className="item-count">
                <button className="item-count-button" onClick={handleDecrement}>-</button>
                <span className="item-count-span">{count}</span>
                <button className="item-count-button" onClick={handleIncrement}>+</button>
            </div>
        </>
    )
}

export default ItemCount;