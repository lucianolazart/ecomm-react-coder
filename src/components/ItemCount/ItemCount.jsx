import { useState } from 'react';
import './ItemCount.css'

function ItemCount({stock, onCountChange}) {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count < stock) {
            const newCount = count + 1;
            setCount(newCount);
            onCountChange(newCount);
        }
    }

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange(newCount);
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