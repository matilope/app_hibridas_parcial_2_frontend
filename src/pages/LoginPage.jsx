import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await (await fetch("http://localhost:3000/api/session", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })).json();
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({ account_name: response.account.name, account_id: response.account._id }));
        navigate("/", { replace: true });
      } else {
        setError(response.message);
      }
    } catch ({ message }) {
      setError(message);
    }
  }

  return (
    <div className="d-flex align-items-center p-3 flex-column justify-content-center vh-100">
      <div className="text-center mb-3">
        <h1 className="display-4 bold">Iniciar sesión</h1>
      </div>
      <div className="col-12 col-md-6 border p-4 formLogin">
        {error &&
          <Alert severity="error" className="w-100 my-2">{error}</Alert>
        }
        <form action="#" method="post" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" onChange={handleEmailChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" onChange={handlePasswordChange} />
          </div>
          <Button type="submit" variant="contained">Enviar</Button>
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
