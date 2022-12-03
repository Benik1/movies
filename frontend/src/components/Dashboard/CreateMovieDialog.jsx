import {
  Grid,
  Zoom,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import * as yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  thumbnailSrc: "",
  trailerSrc: "",
  description: "",
  releaseDate: null,
  rate: "",
};

const movieSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  thumbnailSrc: yup
    .string()
    .url('Enter valid url')
    .required('Thumbnail SRC is required'),
  trailerSrc: yup
    .string()
    .url('Enter valid url')
    .required('TrailerSrc SRC is required'),
  releaseDate: yup
    .string()
    .nullable()
    .required('Release date is required'),
  rate: yup
    .number()
    .min(1, "Min value is 1")
    .max(10, "Max value is 10")
    .required('Rate is required'),
});

function CreateMovieDialog(props) {
  const { open, onClose } = props;

  const onSubmit = (values, helpers) => {
    // TODO:
    console.log("values", values);
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: movieSchema
  });

  const closeModal = () => {
    formik.resetForm();
    onClose();
  }

  const onReleaseDateChange = (date) => {
    formik.setFieldValue("releaseDate", date.toString());
  };

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      onClose={closeModal}
      transitionDuration={300}
      TransitionComponent={Zoom}
    >
      <DialogTitle>Create new movie</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                fullWidth
                label="Name"
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
                name="thumbnailSrc"
                fullWidth
                label="Thumbnail SRC"
                disabled={formik.isSubmitting}
                value={formik.values.thumbnailSrc}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.thumbnailSrc && formik.errors.thumbnailSrc
                }
                error={
                  formik.touched.thumbnailSrc &&
                  Boolean(formik.errors.thumbnailSrc)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="trailerSrc"
                fullWidth
                label="Trailer SRC"
                disabled={formik.isSubmitting}
                value={formik.values.trailerSrc}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                helperText={
                  formik.touched.trailerSrc && formik.errors.trailerSrc
                }
                error={
                  formik.touched.trailerSrc && Boolean(formik.errors.trailerSrc)
                }
              />
            </Grid>

            <Grid item xs={6}>
              <DesktopDatePicker
                fullWidth
                name='releaseDate'
                label="Release Date"
                inputFormat="DD-MM-YYYY"
                disabled={formik.isSubmitting}
                value={formik.values.releaseDate}
                onChange={onReleaseDateChange}
                helperTex='zs'
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={
                      formik.touched.releaseDate && formik.errors.releaseDate
                    }
                    error={
                      formik.touched.releaseDate &&
                      Boolean(formik.errors.releaseDate)
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="rate"
                fullWidth
                label="Rate"
                type="number"
                disabled={formik.isSubmitting}
                value={formik.values.rate}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.rate && formik.errors.rate
                }
                error={
                  formik.touched.rate && Boolean(formik.errors.rate)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                fullWidth
                label="Description"
                multiline
                maxRows={4}
                rows={4}
                disabled={formik.isSubmitting}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.description && formik.errors.description
                }
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            disabled={formik.isSubmitting}
            endIcon={formik.isSubmitting && (
              <CircularProgress
                size={18}
                sx={(theme) => ({ color: theme.palette.info.contrastText })}
              />
            )}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateMovieDialog;
