import { useState } from 'react';
import './Cart.css';
import { useAppContext } from '../../context/context';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const { carrito, eliminarDelCarrito, vaciarCarrito } = useAppContext();
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        correo: ''
    });
    const [errores, setErrores] = useState({});

    const ordenesCollection = collection(db, 'ordenes');

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validarFormulario = () => {
        const newErrores = {};
        if (!formData.nombre.trim()) newErrores.nombre = 'El nombre es obligatorio';
        if (!formData.direccion.trim()) newErrores.direccion = 'La dirección es obligatoria';
        if (!formData.correo.trim()) {
            newErrores.correo = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            newErrores.correo = 'Ingrese un correo válido';
        }
        setErrores(newErrores);
        return Object.keys(newErrores).length === 0;
    };

    const handleFinalizarPedido = () => {
        if (validarFormulario()) {
            setMostrarConfirmacion(true);
        }
    };

    const handleConfirmarPedido = () => {
        addDoc(ordenesCollection, {
            nombre: formData.nombre,
            direccion: formData.direccion,
            correo: formData.correo,
            items: carrito,
            total: calcularTotal()
        }).then((doc) => {
            toast.success(`¡Pedido confirmado con éxito! 🚀. Código de seguimiento: ${doc.id}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setMostrarPopUp(false);
        setMostrarConfirmacion(false);
        setFormData({
            nombre: '',
            direccion: '',
            correo: ''
        });
        vaciarCarrito();
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
                            onClick={() => eliminarDelCarrito(item.id)}
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
                        onClick={() => setMostrarPopUp(true)}
                    >
                        Finalizar Pedido
                    </button>
                </div>
            </div>

            {mostrarPopUp && (
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
                            {errores.nombre && <p className="error-message">{errores.nombre}</p>}
                        </div>
                        <div className="form-group">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                            />
                            {errores.direccion && <p className="error-message">{errores.direccion}</p>}
                        </div>
                        <div className="form-group">
                            <label>Correo:</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                            />
                            {errores.correo && <p className="error-message">{errores.correo}</p>}
                        </div>
                        <div className="dialog-buttons">
                            <button 
                                className="dialog-btn cancel-btn"
                                onClick={() => setMostrarPopUp(false)}
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

            {mostrarConfirmacion && (
                <div className="dialog-overlay">
                    <div className="confirmation-dialog">
                        <h2>¿Desea confirmar el pedido?</h2>
                        <p>Total a pagar: ${calcularTotal()}</p>
                        <div className="dialog-buttons">
                            <button 
                                className="dialog-btn cancel-btn"
                                onClick={() => setMostrarConfirmacion(false)}
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