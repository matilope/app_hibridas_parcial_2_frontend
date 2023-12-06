import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';

function Nav() {
  const linkList = [
    {
      name: 'Inicio',
      url: '/'
    },
    {
      name: 'Juegos',
      url: '/juegos'
    },
    {
      name: 'Iniciar sesión',
      url: '/iniciar-sesion'
    },
    {
      name: 'Registrarse',
      url: '/registro'
    },
    {
      name: 'Administrador',
      url: '/admin'
    },
    {
      name: 'Crear juego',
      url: '/admin/juegos/crear'
    }
  ];

  return (
    <header className="bg-dark">
      <div className="container text-white p-3 d-flex">
        <Link to="/" className="d-flex align-items-center text-decoration-none text-white">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-joystick me-2"
              viewBox="0 0 16 16"
            >
              <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
              <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z" />
            </svg>
          </div>
        </Link>
        <NavBar links={linkList} />
      </div>
    </header>
  );
}

export default Nav;
