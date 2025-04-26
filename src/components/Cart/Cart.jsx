import { useState } from 'react';
import './Cart.css';
import { useAppContext } from '../../context/context';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Cart() {
    const { carrito, eliminarItem } = useAppContext();
    const [showDialog, setShowDialog] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        correo: ''
    });
    const [errors, setErrors] = useState({});

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            newErrors.correo = 'Ingrese un correo válido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFinalizarPedido = () => {
        if (validateForm()) {
            setShowConfirmation(true);
        }
    };

    const handleConfirmarPedido = () => {
        console.log('Pedido confirmado:', { ...formData, items: carrito, total: calcularTotal() });
        setShowDialog(false);
        setShowConfirmation(false);
        setFormData({
            nombre: '',
            direccion: '',
            correo: ''
        });
    };

    if (carrito.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>¿Qué esperas para agregar productos?</p>
                <Link to="/">
                    <button className="empezar-comprar-btn">
                        Empezar a comprar
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart">
            <h1>Carrito</h1>
            {carrito.length > 0 && (
                <div className="cart-total">
                    <h2>Total: ${calcularTotal()}</h2>
                </div>
            )}
            <div className="cart-items">
                {carrito.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.imagen} alt={item.nombre} />
                        <div className="cart-item-info">
                            <h2>{item.nombre}</h2>
                            <p className="cart-item-price">${item.precio}</p>
                        </div>
                        <span className="cart-item-quantity">Cantidad: {item.cantidad}</span>
                        <button 
                            className="delete-button"
                            onClick={() => eliminarItem(item.id)}
                            title="Eliminar producto"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <div className="cart-buttons">
                    <Link to="/">
                        <button className="seguir-comprando-btn">
                            Seguir comprando
                        </button>
                    </Link>
                    <button 
                        className="finalizar-pedido-btn"
                        onClick={() => setShowDialog(true)}
                    >
                        Finalizar Pedido
                    </button>
                </div>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h2>Completar Datos</h2>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                            {errors.nombre && <p className="error-message">{errors.nombre}</p>}
                        </div>
                        <div className="form-group">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                            />
                            {errors.direccion && <p className="error-message">{errors.direccion}</p>}
                        </div>
                        <div className="form-group">
                            <label>Correo:</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                            />
                            {errors.correo && <p className="error-message">{errors.correo}</p>}
                        </div>
                        <div className="dialog-buttons">
                            <button 
                                className="dialog-btn cancel-btn"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="dialog-btn confirm-btn"
                                onClick={handleFinalizarPedido}
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="dialog-overlay">
                    <div className="confirmation-dialog">
                        <h2>¿Desea confirmar el pedido?</h2>
                        <p>Total a pagar: ${calcularTotal()}</p>
                        <div className="dialog-buttons">
                            <button 
                                className="dialog-btn cancel-btn"
                                onClick={() => setShowConfirmation(false)}
                            >
                                No
                            </button>
                            <button 
                                className="dialog-btn confirm-btn"
                                onClick={handleConfirmarPedido}
                            >
                                Sí
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;