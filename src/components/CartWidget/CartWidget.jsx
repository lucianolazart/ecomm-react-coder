import { useAppContext } from "../../context/context";
import './CartWidget.css';

function CartWidget() {

    const {carrito} = useAppContext();

    return (
        <div className="cart-widget">
            <span>🛒</span>
            <span>({carrito.length})</span>
        </div>
    )
}

export default CartWidget;