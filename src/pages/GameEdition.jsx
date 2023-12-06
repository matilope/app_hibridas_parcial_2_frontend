import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function GameEditionPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [members, setMembers] = useState([]);
  const [edition, setEdition] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const game = await (await fetch(`http://localhost:3000/api/games/${id}`)).json();
        if (game) {
          setName(game.name);
          setDescription(game.description);
          setGenre(game.genre);
          setMembers(game.members);
          setEdition(game.edition);
        }
      } catch ({message}) {
        setError(message);
      }
    }
    fetchData();
  }, [id]);

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
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "PATCH",
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
      navigate(`/juegos/${id}`, { replace: true });
    } catch ({message}) {
      setError(message);
    }
  }

  return (
    <div className="form-admin mx-auto">
      <h1 className="h1 mb-3">Editar juego</h1>
      {error &&
        <Alert severity="error" className="w-100 my-2">{error}</Alert>
      }
      <form action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="my-3">
          <label className="form-label" htmlFor="name">Nombre</label>
          <input className="form-control" id="name" type="text" defaultValue={name || ""} onChange={handleNameChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="description">Descripción</label>
          <textarea className="form-control" id="description" cols="10" rows="3" onChange={handleDescriptionChange} defaultValue={description || ""} required></textarea>
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="genre">Género</label>
          <input className="form-control" id="genre" type="text" defaultValue={genre || ""}  onChange={handleGenreChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="members">Creadores del juego (Ej: Nombre1,Nombre2)</label>
          <input className="form-control" id="members" type="text" defaultValue={Array.isArray(members) ? members.join(", ") : members}  onChange={handleMembersChange} required />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="edition">Año de edición</label>
          <input className="form-control" id="edition" type="number" defaultValue={edition || ""}  onChange={handleEditionChange} required />
        </div>
        <Button type="submit" variant="contained">Editar juego</Button>
      </form>
    </div>
  )
}

export default GameEditionPage;