import { Card, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import ActionBar from './ActionBar';

function MovieItem(props) {
  const { id, src, name, description } = props.movie;

  return (
    <Link to={`${id}`}>
      <Card elevation={3} >
        <Grid container direction='column' p={3}>
          <img
            style={{
              maxWidth: 200,
              maxHeight: 300,
              borderRadius: 8
            }}
            src={src}
            alt={name}
          />
          <Typography mt={1} variant='h6'> {name} </Typography>
          <Typography> {description} </Typography>
          <ActionBar movie={props.movie} />
        </Grid>
      </Card>
    </Link>
  )
}


export default MovieItem;