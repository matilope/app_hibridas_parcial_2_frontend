import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardGame } from "../components/Card";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const games = await (await fetch(`http://localhost:3000/api/games` /*, {
          method: "GET",
          headers: {
            "token": localStorage.getItem("token")
          }
        }*/)).json();
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
    <>
      <h1>Listado de juegos</h1>
      <div className="row gap-3">
        {
          games?.map((game) => {
            return (
              <div key={game._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <CardGame game={game} />
              </div>
            )
          })
        }
      </div>
      {error &&
        <p>{error}</p>
      }
    </>
  )
}

export default GamesPage;