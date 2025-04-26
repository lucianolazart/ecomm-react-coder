import { useAppContext } from "../../context/context";
import './CartWidget.css';

function CartWidget() {

    const {carrito} = useAppContext();

    const calcularCantidadTotal = () => {
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <div className="cart-widget">
            <span>🛒</span>
            <span>({calcularCantidadTotal()})</span>
        </div>
    )
}

export default CartWidget;