import { Link } from 'react-router-dom';

const NavBar = ({ links }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <ul className="navbar-nav">
        {links?.map((item) => (
          (item.name === 'Iniciar sesión' && localStorage.getItem('token')) ? null :
          (item.name === 'Registrarse' && localStorage.getItem('token')) ? null :
          <li className="nav-item" key={item.name}>
            <Link className="nav-link" to={item.url}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export { NavBar };
