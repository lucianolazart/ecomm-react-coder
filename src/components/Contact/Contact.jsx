import { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
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
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Ingrese un email válido';
        }
        if (!formData.mensaje.trim()) {
            newErrors.mensaje = 'El mensaje es obligatorio';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            setSuccessMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            setFormData({
                nombre: '',
                email: '',
                mensaje: ''
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
    };

    return (
        <div className="contact-container">
            <h1>Contacto</h1>
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre"
                    />
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingresa tu email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje"
                    />
                    {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={Object.keys(errors).length > 0}
                >
                    Enviar mensaje
                </button>
            </form>
        </div>
    );
}

export default Contact;