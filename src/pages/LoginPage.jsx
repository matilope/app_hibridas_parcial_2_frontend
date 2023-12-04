import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const session = await (await fetch("http://localhost:3000/api/session", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })).json();
      localStorage.setItem("token", session.token);
      navigate("/", { replace: true });
    } catch ({ message }) {
      setError(message);
    }
  }

  return (
    <>
      <form action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="my-3">
          <label htmlFor="email"></label>
          <input id="email" type="email" onChange={handleEmailChange} />
        </div>
        <div className="my-3">
          <label htmlFor="password"></label>
          <input id="password" type="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {error &&
        <p>{error}</p>
      }
    </>
  )
}

export default LogInPage;