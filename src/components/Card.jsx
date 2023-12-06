import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const CardGame = ({ game }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={game.name}
        height="240"
        image="/images/default.jpg"
      />
      <CardContent className="pb-0">
        <Typography gutterBottom variant="h5" component="div">
          <h2 className="h4 mb-2">{game.name}</h2>
        </Typography>
        {game.description &&
          <Typography variant="body2" color="text.secondary" className="description">
            {game.description}
          </Typography>
        }
      <Typography variant="body2" color="text.secondary" className="my-2">
        <b>Género:</b> {game.genre}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="my-2">
        <b>Creado por:</b> {Array.isArray(game.members) ? game.members.join(", ") : game.members}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="my-2">
        <b>Publicado en:</b> {game.edition}
      </Typography>
      </CardContent>
      <CardActions className="px-3">
        <Button size="small" className="px-0">
          <Link to={game._id}>Ver más</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export {
  CardGame
}