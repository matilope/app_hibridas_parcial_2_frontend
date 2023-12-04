import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BasicAccordion } from "../components/Accordion";
import StarIcon from '@mui/icons-material/Star';

function GamePage() {
  const [game, setGame] = useState({});
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const game = await (await fetch(`http://localhost:3000/api/games/${id}`)).json();
        const votes = await (await fetch(`http://localhost:3000/api/games/${id}/votes`)).json();
        if (game) {
          setGame(game);
        }
        if (votes) {
          setVotes(votes);
        }
      } catch ({ message }) {
        setError(message);
      }
    }
    fetchData();
  }, [id]);
  return (
    <>
      <article className="game-view">
        <div className="product-image-container">
          <img
            src="/images/default.jpg"
            alt={game.name}
            height="320"
          />
        </div>
        <div className="product-info-container">
          <h1 className="mb-3">{game.name}</h1>
          {
            game.description &&
            <BasicAccordion name="Descripción" info={game.description} />
          }
          <BasicAccordion name="Género" info={game.genre} />
          <BasicAccordion name="Creadores" info={game.members?.join(", ")} />
          <BasicAccordion name="Edición" info={game.edition} />
        </div>
        <p>{error}</p>
      </article>
      <div className="valoraciones">
        <div className="valoraciones-info">
          <span><b>Valoraciones</b> {game.totalScore / votes.length}</span>
          <span><b>Votos totales</b> {votes.length}</span>
        </div>
        <div className="valoraciones-usuarios">
          {votes &&
            votes?.map((vote) => {
              return (
                <div key={vote._id} className="valoraciones-usuarios-data">
                  <span className="mb-2">{vote.account_name}</span>
                  <span className="mb-3">
                    {vote.rating && Array.from({ length: vote.rating }).map((_, index) => (
                      <StarIcon key={index} color="primary" fontSize="large" />
                    ))}
                  </span>
                  <p className="m-0">{vote.comment}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default GamePage;