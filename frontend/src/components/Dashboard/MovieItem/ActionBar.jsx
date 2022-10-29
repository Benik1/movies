import { useState } from 'react';
import { Grid } from '@mui/material';
import { red, green } from '@mui/material/colors';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteMovieDialog from './DeleteMovieDialog';
import UpdateMovieDialog from './UpdateMovieDialog';



function ActionBar(props) {
  const { id, name } = props.movie;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const toggleDeleteDialog = (open) => (e) => {
    e.preventDefault(e);
    setOpenDeleteDialog(open);
  }

  const toggleUpdateDialog = (open) => (e) => {
    e.preventDefault(e);
    setOpenUpdateDialog(open);
  }

  return (
    <Grid container justifyContent='flex-end' alignItems='center' pt={2}>
      <EditOutlinedIcon sx={{ marginRight: 1, color: green[500] }} onClick={toggleUpdateDialog(true)} />

      <DeleteOutlineOutlinedIcon sx={{ color: red[500] }} onClick={toggleDeleteDialog(true)} />

      {openUpdateDialog && (
        <UpdateMovieDialog
          movie={props.movie}
          open={openUpdateDialog}
          onClose={toggleUpdateDialog(false)}
        />
      )}

      {openDeleteDialog && (
        <DeleteMovieDialog
          id={id}
          name={name}
          open={openDeleteDialog}
          onClose={toggleDeleteDialog(false)}
        />
      )}
    </Grid>
  )
}

export default ActionBar;
