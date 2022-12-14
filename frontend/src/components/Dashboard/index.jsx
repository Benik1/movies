import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Container, Grid, CircularProgress, IconButton,  } from '@mui/material';

import NavBar from '../NavBar';
import MovieItem from './MovieItem';
import CreateMovieDialog from './CreateMovieDialog';
import { getAllMovies, resetMovies } from 'store/movies'

function Dashboard() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

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
      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30 }} onClick={openDialog}>
        <AddCircleIcon color='secondary' sx={{ fontSize: 60 }} />
      </IconButton>
      <CreateMovieDialog open={open} onClose={closeDialog} />
    </Container>
  )
}

export default Dashboard;
