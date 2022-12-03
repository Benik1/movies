import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Container, Grid, CircularProgress, IconButton,  } from '@mui/material';

import MovieItem from './MovieItem';
import { getAllMovies, resetMovies } from 'store/movies'
import NavBar from '../NavBar';

function Dashboard() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);

  const { data, loading } = movies;

  useEffect(() => {
    dispatch(getAllMovies())
    return () => {
      dispatch(resetMovies())
    }
  }, [])

  return (
    <Container sx={{ mt: '60px', paddingTop: 4 }} >
      <NavBar />
      <Grid container spacing={3} justifyContent='center'>
        {loading ? (
          <CircularProgress size={70} sx={{ marginTop: 40 }} />
        ) : (
          data?.map((movie) => {
            return (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <MovieItem movie={movie} />
              </Grid>
            )
          })
        )}
      </Grid>
      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30 }}>
        <AddCircleIcon color='secondary' sx={{ fontSize: 60 }} />
      </IconButton>
    </Container>
  )
}

export default Dashboard;
