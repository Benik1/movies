import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

function DeleteMovieDialog(props) {
  const { open, id, onClose, name } = props;

  const onDelete = () => {
    // TODO:
    console.log('delete ', id)
    onClose()
  }

  return (
    <Dialog
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
        <Button onClick={onClose}>Cancel</Button>
        <Button color='error' onClick={onDelete}>Delate</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteMovieDialog;
