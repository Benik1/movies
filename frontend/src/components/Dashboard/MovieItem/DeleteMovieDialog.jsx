import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  DialogContentText,
} from '@mui/material';
import { deleteMovieById } from '../../../store/movies';
import { useSelector, useDispatch } from 'react-redux'

function DeleteMovieDialog(props) {
  const dispatch = useDispatch();

  const { open, id, onClose, name } = props;

  const movies = useSelector((state) => state.movies);
  const { deleteMovieLoading } = movies;

  const onDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteMovieById(id))
      .then(() => {
        onClose(e)
      })
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
      <DialogTitle>Delete Movie</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Are you sure you want to delete movie ${name}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={deleteMovieLoading} onClick={onClose}>Cancel</Button>
        <Button
          disabled={deleteMovieLoading}
          color='error'
          onClick={onDelete}
          endIcon={deleteMovieLoading && <CircularProgress color='error' size={18} />}
        >
          Delate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteMovieDialog;
