import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { BasicTable } from "../components/Table";

function AdminPageList() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const games = await (await fetch(`http://localhost:3000/api/games`)).json();
        if (games.length) {
          setGames(games);
        } else {
          navigate("/", { replace: true });
        }
      } catch ({ message }) {
        navigate("/", { replace: true });
        setError(message);
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div className="admin-panel mx-auto">
      <h1 className="h1 mb-3">Bienvenido al panel de administración</h1>
      {error &&
        <Alert severity="error" className="w-100 my-2">{error}</Alert>
      }
      <BasicTable games={games} />
    </div>
  )
}

export default AdminPageList;