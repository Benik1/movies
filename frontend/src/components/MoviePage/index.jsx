import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  Rating,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getMovieData, resetMoveData, updateMovie } from 'store/movie';
import NavBar from '../NavBar';

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

  const [rate, setRate] = useState(null);

  useEffect(() => { setRate(data?.rate || null) }, [data])

  const onRateChange = (e) => {
    if (data?.id) {
      const rate = Number(e.target.value);
      dispatch(updateMovie(data.id, { rate }));
    }
  }

  useEffect(() => {
    dispatch(getMovieData(movieId));

    return () => {
      dispatch(resetMoveData());
    }
  }, [movieId]);

  return (
    <Container sx={{ mt: '60px', paddingTop: 4 }}>
      <NavBar />
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
                <Rating marginTop={10} max={10} value={rate} onChange={onRateChange} />

                <Typography mt={4} color='primary' variant='h6' display='inline' fontStyle='italic'>Release Date </Typography>
                <Typography display='inline'> {moment(data?.releaseDate).format('LL')} </Typography>

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
