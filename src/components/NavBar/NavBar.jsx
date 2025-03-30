import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import logo from '../../assets/logo.jpeg'
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="nav-logo">
                <img src={logo} alt="logo" />
            </a>
            
            <ul className="nav-menu">
                <li className="nav-menu-item">
                    <Link to="/">
                        Inicio
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/productos/funkos">
                        Funkos
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/productos/tazas">
                        Tazas
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/productos/remeras">
                        Remeras
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/productos/friends">
                        Friends
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/productos/tbbt">
                        TBBT
                    </Link>
                </li>
                <li className="nav-menu-item">
                    <Link to="/contacto">
                        Contacto
                    </Link>
                </li>
            </ul>

            <CartWidget />
        </nav>
    )
}

export default NavBar;