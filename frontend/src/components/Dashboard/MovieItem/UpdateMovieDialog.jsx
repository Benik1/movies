import { useState } from 'react';
import {
  Grid,
  Select,
  Button,
  Dialog,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  ListItemText,
  DialogContent,
  OutlinedInput,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { actors } from "constants"
import { updateMovieById } from 'store/movies';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UpdateMovieDialog(props) {
  const dispatch = useDispatch();

  const { open, movie, onClose } = props;

  const movies = useSelector((state) => state.movies);

  const { updateMovieLoading } = movies;

  const [movieName, setMovieName] = useState(movie.name);
  const [actorsNames, setActorsNames] = useState(movie.actors);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate);

  const onNameChange = (e) => {
    const value = e?.target?.value || ''
    setMovieName(value);
  }
  const handleChange = (event) => {
    const value = event.target.value
    setActorsNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  }

  const onReleaseDateChange = (date) => {
    setReleaseDate(date);
  };

  const onUpdate = (e) => {
    if (updateMovieLoading) return;
    e.stopPropagation();
    dispatch(
      updateMovieById(
        movie.id,
        {
          name: movieName,
          actors: actorsNames,
          releaseDate
        }
      )
    )
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
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Movie Name'
              onChange={onNameChange}
              value={movieName} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Actors Names</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={actorsNames}
                onChange={handleChange}
                input={<OutlinedInput label="Actors Names" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {actors.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={actorsNames.indexOf(name) > - 1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
