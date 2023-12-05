import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BasicAccordion } from "../components/Accordion";
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function GamePage() {
  const [game, setGame] = useState({});
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleRatingChange = (e) => {
    if(e.target.value <= 0 && e.target.value > 5) {
      setError("El rating tiene que ser entre 1 y 5 inclusive");
    } else {
      setError("");
      setRating(e.target.value);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { account_name, account_id } = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://localhost:3000/api/games/${game.id}/votes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ comment, rating, account_name, account_id, game_id: game._id })
      });
      if (!response.ok) {
        throw new Error("Ha ocurrido un error");
      }
    } catch ({ message }) {
      setError(message);
    }
  }

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
          <h1 className="h1 mb-3">{game.name}</h1>
          {
            game.description &&
            <BasicAccordion name="Descripción" info={game.description} />
          }
          <BasicAccordion name="Género" info={game.genre} />
          <BasicAccordion name="Creadores" info={game.members?.join(", ")} />
          <BasicAccordion name="Edición" info={game.edition} />
        </div>
      </article>
      <div className="ratings">
        <div className="ratings-info">
          <span><b>Promedio</b> {game.totalScore / votes.length}</span>
          <span><b>Votos totales</b> {votes.length}</span>
        </div>
        <div className="ratings-users">
          {votes &&
            votes?.map((vote) => {
              return (
                <div key={vote._id} className="ratings-users-data">
                  <span className="mb-2">{vote.account_name}</span>
                  <span className="mb-3">
                    {vote.rating && Array.from({ length: vote.rating }).map((_, index) => (
                      <StarIcon key={index} color="primary" fontSize="medium" />
                    ))}
                  </span>
                  <p className="m-0">{vote.comment}</p>
                </div>
              )
            })
          }
        </div>
        {error &&
          <Alert severity="error" className="w-100">{error}</Alert>
        }
        <form className="form-rating" action="#" method="post" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="rating">Calificación</label>
            <input className="form-control" id="rating" type="number" min="1" max="5" onChange={handleRatingChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="comment">Comentario</label>
            <textarea className="form-control" id="comment" cols="30" rows="3" onChange={handleCommentChange} required></textarea>
          </div>
          <Button type="submit" variant="contained">Enviar</Button>
        </form>
      </div>
    </>
  )
}

export default GamePage;