import { useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { updateMovieById } from 'store/movies';

function UpdateMovieDialog(props) {
  const dispatch = useDispatch();

  const { open, movie, onClose } = props;

  const movies = useSelector((state) => state.movies);

  const { updateMovieLoading } = movies;

  const [name, setName] = useState(movie.name);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate);

  const onNameChange = (e) => {
    const value = e?.target?.value || ''
    setName(value);
  }

  const onReleaseDateChange = (date) => {
    setReleaseDate(date);
  };

  const onUpdate = (e) => {
    if (updateMovieLoading) return;
    e.stopPropagation();
    dispatch(updateMovieById(movie.id, { name, releaseDate }))
      .then(() => {
        onClose(e)
        setName('');
      })
  }

  const onModalClose = (e) => {
    setName('');
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
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Movie Name'
              onChange={onNameChange}
              value={name} />
          </Grid>
          <Grid item xs={6}>
            <DesktopDatePicker
              fullWidth
              label="Release Data"
              inputFormat="DD-MM-YYYY"
              value={releaseDate}
              onChange={onReleaseDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClose}>Cancel</Button>
        <Button
          color='error'
          onClick={onUpdate}
          disabled={!name || !releaseDate}
          endIcon={updateMovieLoading && <CircularProgress color='error' size={15} />}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateMovieDialog;
