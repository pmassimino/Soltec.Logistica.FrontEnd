import React from "react";

import styles from "./menu.module.css";

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
      <a className="nav-link" href="/chofer">
        Choferes
      </a>
      <a className="nav-link" href="/registro">
        Registro
      </a>
      <a className="nav-link" href="/viaje">
        Viajes
      </a>
      </div>
      </div>
      <div className="nav navbar-nav navbar-right">
        <div className="dropdown">
        <a className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi-person-circle"></i>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/login"><i className="bi bi-box-arrow-in-right"></i>Login</a>
          {isAuthenticated && (
            <a className="dropdown-item" href="" onClick={logout}><i className="bi bi-box-arrow-in-left"></i>Logout</a>
          )}
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/usuarios">
            Usuarios
          </a>
        </div>
        </div>
      </div>
    </div>
  </nav>

);

export default Menu;