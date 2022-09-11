import { Typography, Grid } from '@mui/material';

function MovieItem(props) {
  const { name, releaseDate } = props;

  return (
    <Grid item container p={2} m={2}  alignItems='center' sx={{ border: '1px black solid' }}>
      <Typography variant='h5'> {name}</Typography>
      <Typography variant='body1' ml={2}> {releaseDate}</Typography>
    </Grid>
  )
}

export default MovieItem;
