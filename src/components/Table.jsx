import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const BasicTable = ({ games }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "token": localStorage.getItem("token")
        }
      });
      if (!response.ok) {
        const bodyResponse = await response.json();
        throw new Error(bodyResponse);
      }
      navigate("/juegos", { replace: true });
    } catch ({ message }) {
      setError(message);
    }
  }

  return (
    <>
      {error &&
        <Alert severity="error" className="w-100 my-2">{error}</Alert>
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Edición</TableCell>
              <TableCell align="right">Género</TableCell>
              <TableCell align="right">Miembros</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow
                key={game._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {game.name}
                </TableCell>
                <TableCell align="right">{game.edition}</TableCell>
                <TableCell align="right">{game.genre}</TableCell>
                <TableCell align="right">{Array.isArray(game.members) ? game.members.join(", ") : game.members}</TableCell>
                <TableCell align="right" className="table-actions">
                  <form action="#" method="post" onSubmit={(e) => handleFormSubmit(e, game._id)}>
                    <Button type="submit" color="error" variant="contained">Eliminar</Button>
                  </form>
                  <Link to={'/admin/juegos/' + game._id + '/editar'}>
                    <Button color="warning" variant="contained">Editar</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export {
  BasicTable
}