import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import logo from '../../assets/logo.jpeg'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="nav-logo">
                <img src={logo} alt="logo" />
            </Link>
            
            <ul className="nav-menu">
                <li className="nav-menu-item">
                    <Link to="/">Inicio</Link>
                </li>
                
                <li className="nav-menu-item dropdown">
                    <span className="dropdown-trigger">Categorías</span>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/productos/funkos">Funkos</Link>
                        </li>
                        <li>
                            <Link to="/productos/tazas">Tazas</Link>
                        </li>
                        <li>
                            <Link to="/productos/remeras">Remeras</Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-menu-item dropdown">
                    <span className="dropdown-trigger">Series</span>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/productos/friends">Friends</Link>
                        </li>
                        <li>
                            <Link to="/productos/tbbt">TBBT</Link>
                        </li>
                        <li>
                            <Link to="/productos/breakingbad">Breaking Bad</Link>
                        </li>
                        <li>
                            <Link to="/productos/simpsons">Los Simpsons</Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-menu-item">
                    <Link to="/contacto">Contacto</Link>
                </li>
            </ul>

            <Link to="/carrito">
                <CartWidget />
            </Link>
        </nav>
    )
}

export default NavBar;