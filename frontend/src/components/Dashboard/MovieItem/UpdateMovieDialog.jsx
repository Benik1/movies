import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  DialogContentText,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

function UpdateMovieDialog(props) {
  const dispatch = useDispatch();

  const { open, id, onClose, name } = props;

  const movies = useSelector((state) => state.movies);

  const [movieName, setMovieName] = useState('');

  const onChange = (e) => {
    const value = e?.target?.value || ''
    setMovieName(value);
  }

  const onUpdate = (e) => {
    e.stopPropagation();
    // TODO:
  }

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault(e);
  }

  return (
    <Dialog
      onClick={onClick}
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Update movie ${name}`}</DialogTitle>
      <DialogContent>
        <TextField sx={{ mt: 2 }} label='Movie Name' onChange={onChange} defaultValue={name} value={movieName} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color='error'
          onClick={onUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateMovieDialog;
