import {
  Grid,
  Slide,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  thumbnailSrc: '',
  trailerSrc: '',
  description: '',
  releaseDate: '',
  rate: ''
};

function CreateMovieDialog(props) {
  const { open, onClose } = props;

  const onSubmit = (values, helpers) => {
    // TODO:
  }

  const formik = useFormik({
    onSubmit,
    initialValues,
  });

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      onClose={onClose}
      transitionDuration={300}
      TransitionComponent={Slide}
    >
      <DialogTitle>Create new movie</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} p={2}>

          <Grid item xs={12}>
            <TextField
              name='name'
              fullWidth
              label='Name'
              disabled={formik.isSubmitting}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='thumbnailSrc'
              fullWidth
              label='Thumbnail SRC'
              disabled={formik.isSubmitting}
              value={formik.values.thumbnailSrc}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.thumbnailSrc && formik.errors.thumbnailSrc}
              error={formik.touched.thumbnailSrc && Boolean(formik.errors.thumbnailSrc)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='trailerSrc'
              fullWidth
              label='Trailer SRC'
              disabled={formik.isSubmitting}
              value={formik.values.trailerSrc}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.trailerSrc && formik.errors.trailerSrc}
              error={formik.touched.trailerSrc && Boolean(formik.errors.trailerSrc)}
            />
          </Grid>

        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' color='info'> Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateMovieDialog;
