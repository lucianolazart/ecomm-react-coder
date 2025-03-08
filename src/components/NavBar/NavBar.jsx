import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="nav-logo">
                TiendaReact
            </a>
            
            <ul className="nav-menu">
                <li><a className="nav-menu-item" href="/productos">Productos</a></li>
                <li><a className="nav-menu-item" href="/categorias">Categorías</a></li>
                <li><a className="nav-menu-item" href="/ofertas">Ofertas</a></li>
                <li><a className="nav-menu-item" href="/contacto">Contacto</a></li>
            </ul>

            <CartWidget />
        </nav>
    )
}

export default NavBar;