import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

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
    const membersInArray = e.target.value.split(",") || e.target.value;
    setMembers(membersInArray);
  }

  const handleEditionChange = (e) => {
    setEdition(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify({ name, description, genre, members, edition })
      });
      if (!response.ok) {
        const bodyResponse = await response.json();
        throw new Error(bodyResponse);
      }
      navigate("/juegos", { replace: true });
    } catch ({message}) {
      setError(message);
    }
  }

  return (
    <div className="form-admin mx-auto">
      <h1 className="h1 mb-3">Crear juego</h1>
      {error &&
        <Alert severity="error" className="w-100 my-2">{error}</Alert>
      }
      <form className="form-admin" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="my-3">
          <label className="form-label" htmlFor="name">Nombre</label>
          <input className="form-control" id="name" type="text" onChange={handleNameChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="description">Descripción</label>
          <textarea className="form-control" id="description" cols="10" rows="3" onChange={handleDescriptionChange} required></textarea>
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="genre">Género</label>
          <input className="form-control" id="genre" type="text" onChange={handleGenreChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="members">Creadores del juego (Ej: Nombre1,Nombre2)</label>
          <input className="form-control" id="members" type="text" onChange={handleMembersChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="edition">Año de edición</label>
          <input className="form-control" id="edition" type="number" onChange={handleEditionChange} required />
        </div>
        <Button type="submit" variant="contained">Crear juego</Button>
      </form>
    </div>
  )
}

export default GameCreatePage;