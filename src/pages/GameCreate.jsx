import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function GameCreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [members, setMembers] = useState([]);
  const [edition, setEdition] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  }

  const handleMembersChange = (e) => {
    setMembers(e.target.value);
  }

  const handleEditionChange = (e) => {
    setEdition(e.target.value);
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
      {error &&
        <Alert severity="error">{error}</Alert>
      }
      <form action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="my-3">
          <label htmlFor="email"></label>
          <input id="email" type="email" onChange={handleNameChange} />
        </div>
        <div className="my-3">
          <label htmlFor="description"></label>
          <textarea id="description" cols="10" rows="3" onChange={handleDescriptionChange}></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default GameCreatePage;