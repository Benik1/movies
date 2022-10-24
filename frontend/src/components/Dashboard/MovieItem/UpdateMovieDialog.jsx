import { useState } from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { updateMovieById } from '../../../store/movies';


function UpdateMovieDialog(props) {
  const dispatch = useDispatch();

  const { open, movie, onClose } = props;

  const movies = useSelector((state) => state.movies);

  const { updateMovieLoading } = movies;

  const [movieName, setMovieName] = useState('');

  const onNameChange = (e) => {
    const value = e?.target?.value || ''
    setMovieName(value);
  }

  const onUpdate = (e) => {
    if(updateMovieLoading) return;
    e.stopPropagation();
    dispatch(updateMovieById(movie.id, { name: movieName }))
      .then(() => {
        onClose(e)
        setMovieName('');
      })
  }

  const onModalClose = (e) => { 
    setMovieName('');
    onClose(e)
  }

  const onClick = (e) => {
    e.stopPropagation();
  }

  return (
    <Dialog
      onClick={onClick}
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Update movie ${movie.name}`}</DialogTitle>
      <DialogContent>
        <TextField sx={{ mt: 2 }} label='Movie Name' onChange={onNameChange} defaultValue={movie.name} value={movieName} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClose}>Cancel</Button>
        <Button
          color='error'
          onClick={onUpdate}
          disabled={!movieName}
          endIcon={updateMovieLoading && <CircularProgress color='error' size={15} />}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateMovieDialog;
