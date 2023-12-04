import { Link } from "react-router-dom";
import './style.css';

function Menu() {
    return (
        <>
            <nav className="nav-extended">
                <div className="nav-wrapper"></div>
                <div className="nav-content">
                    <ul className="tabs tabs-transparent">
                        <li className="tab selected"><Link to="/">Início</Link></li>
                        <li className="tab selected"><Link to="/funcionarios">Funcionarios</Link></li>
                        <li className="tab selected"><Link to="/duplas">Duplas</Link></li>
                    </ul>
                </div>
            </nav>

        </>
    )
}
export default Menu;

/* <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Escala de Limpeza</a>
                </div>
                */