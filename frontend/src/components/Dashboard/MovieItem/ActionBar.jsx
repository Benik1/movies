import { useState } from 'react';
import { Grid } from '@mui/material';
import { red, green } from '@mui/material/colors';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteMovieDialog from './DeleteMovieDialog';



function ActionBar(props) {
  const { id, name } = props.movie;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onEdit = (id) => (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const toggleDeleteDialog = (open) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDeleteDialog(open);
  }

  return (
    <Grid container justifyContent='flex-end' alignItems='center' pt={2}>
      <EditOutlinedIcon sx={{ marginRight: 1, color: green[500] }} onClick={onEdit(id)} />
      <DeleteOutlineOutlinedIcon sx={{ color: red[500] }} onClick={toggleDeleteDialog(true)} />

      <DeleteMovieDialog
        id={id}
        name={name}
        open={openDeleteDialog}
        onClose={toggleDeleteDialog(false)}
      />
    </Grid>
  )
}

export default ActionBar;
