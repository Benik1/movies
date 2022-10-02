
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid } from '@mui/material';

import { getAllMovies } from '../../store/movies'
import { useEffect } from 'react';

import MovieItem from './MovieItem';


function Dashboard() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);

  const { data, loading } = movies;

  useEffect(() => {
    dispatch(getAllMovies())
  }, [])

  return (
    <Container sx={{ paddingTop: 4 }} >
      <Grid container spacing={3}>
        {data?.map((movie) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MovieItem name={movie.name} src={movie.src} description={movie.description} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Dashboard;
