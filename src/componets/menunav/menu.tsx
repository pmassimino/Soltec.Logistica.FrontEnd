import React from "react";

import styles from "./menu.module.css";
import Link from "next/link";

type MenuProps = {
  isAuthenticated: boolean;
  logout: () => void;
}
const links = [
  { title: "Home", path: "/", icon: "" },
  { title: "Tipo Viajes", path: "/tipoviajes", icon: "" },
  { title: "Choferes", path: "/choferes", icon: "" },
  { title: "Registro", path: "/registro", icon: "" },

]

const Menu: React.FC<MenuProps> = ({ isAuthenticated, logout }) => (
  <nav className="navbar navbar-expand">
    <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">      
      <Link className="nav-link" href="/chofer">
        Choferes
      </Link>
      <Link className="nav-link" href="/registro">
        Registro
      </Link>
      <Link className="nav-link" href="/viaje">
        Viajes
      </Link>
      </div>
      </div>
      <div className="nav navbar-nav navbar-right">
        <div className="dropdown">
        <Link className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi-person-circle"></i>
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" href="/login"><i className="bi bi-box-arrow-in-right"></i>Login</Link>
          {isAuthenticated && (
            <Link className="dropdown-item" href="" onClick={logout}><i className="bi bi-box-arrow-in-left"></i>Logout</Link>
          )}
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" href="/usuarios">
            Usuarios
          </Link>
        </div>
        </div>
      </div>
    </div>
  </nav>

);

export default Menu;