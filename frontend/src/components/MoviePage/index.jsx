import { useEffect } from 'react';
import {
  Grid,
  Card,
  Rating,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getMovieData, resetMoveData } from '../../store/movie';


const getMoveIframe = (movie) => {
  const { name, trailerSrc } = movie;
  const iframeString = `
    <iframe
      width="650"
      height="400"
      src="${trailerSrc}"
      title="${name}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  `
  return {
    __html: iframeString
  }
}


function MoviePage() {

  const { movieId } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movie);

  const { data, loading } = movie;

  useEffect(() => {
    dispatch(getMovieData(movieId));

    return () => {
      dispatch(resetMoveData());
    }
  }, [movieId]);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Grid container justifyContent='center'>
        {loading ? (
          <CircularProgress size={70} sx={{ marginTop: 40 }} />
        ) : (
          data && (
            <Grid container spacing={2}>
              <Grid item xs={8} container justifyContent='center' alignItems='center'>
                <Card elevation={4} sx={{}}>
                  {data && <div dangerouslySetInnerHTML={getMoveIframe(data)} />}
                </Card>
              </Grid>
              <Grid container item xs={4} direction='column'>
                <Typography variant='h4'> {data?.name}</Typography>
                <Typography mt={4} color='primary' variant='h6' display='inline' fontStyle='italic'>Rating </Typography>
                <Rating marginTop={10} max={10} value={data?.rate} readOnly />

                <Typography mt={4} color='primary' variant='h6' display='inline' fontStyle='italic'>Actors </Typography>
                {data?.actors.map((actor) => {
                  return <Typography display='inline'> {actor} </Typography>
                })}
              </Grid>
              <Grid container item xs={12} justifyContent='center' alignItems='center' px={6} mt={3}>
                <Typography>
                  {data?.description}
                </Typography>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  )
}

export default MoviePage;
