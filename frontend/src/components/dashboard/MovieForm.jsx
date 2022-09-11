import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid } from '@mui/material';
import { MOVIES_ADD_MOVIE } from '../../store/movies';

const movieInitialState = { name: '', releaseDate: '' }

function MovieForm() {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(movieInitialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setMovie({
      ...movie,
      [name]: value
    })
  }

  const addToStore = () => {
    dispatch({
      type: MOVIES_ADD_MOVIE,
      payload: movie
    });
    setMovie(movieInitialState);
  }

  return (
    <Grid container>
      <TextField onChange={onChange} value={movie.name} name='name' label='Movie Name'/>
      <TextField onChange={onChange} value={movie.releaseDate} name='releaseDate' label="Movie Release Date" />
      <Button onClick={addToStore} disabled={!(movie.name && movie.releaseDate)} variant='contained'>
        Add movie to store
      </Button>
    </Grid>
  )
}

export default MovieForm;