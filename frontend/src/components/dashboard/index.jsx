
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@mui/material';

import { getAllMovies } from '../../store/movies'
import { useEffect } from 'react';

function Dashboard() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);

  const { data, loading } = movies;

  useEffect(() => {
    dispatch(getAllMovies())
  }, [])


  return (
    <Container sx={{ paddingTop: 4 }} >


    </Container>
  )
}

export default Dashboard;
