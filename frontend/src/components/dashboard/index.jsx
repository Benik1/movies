
import { useSelector, useDispatch } from 'react-redux'
import MovieForm from './MovieForm';
import MovieItem from './MovieItem';
import { Container } from '@mui/material';

function Dashboard() {
  const movies = useSelector((state) => state.movies);
  const { data } = movies;

  return (
    <Container sx={{ paddingTop: 4 }} >
      <MovieForm />
      {data.map((movie) => {
        return (
          <MovieItem key={movie.name} name={movie.name} releaseDate={movie.releaseDate} />
        )
      })}
    </Container>
  )
}

export default Dashboard;
