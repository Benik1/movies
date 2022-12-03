import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { singIn } from '../../store/user';
import { Grid, TextField, Button, Paper, CircularProgress } from '@mui/material';

const initialValues = { email: '', password: '' };

export const singInSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

function SingInPage() {
  const dispatch = useDispatch();

  const onSubmit = (values, helpers) => {
    dispatch(singIn(values))
      .finally((res) => {
        helpers.resetForm();
        helpers.setSubmitting(false);
      })
  }

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: singInSchema
  })

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      sx={(theme) => ({
        width: '100vw',
        height: '100vh',
        bgcolor: theme.palette.grey[400],
      })}
    >
      <Paper elevation={3} sx={{ width: 700, height: 500 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} px={16} pt={20}>
            <Grid item xs={12}>
              <TextField
                name='email'
                fullWidth
                label='Email'
                disabled={formik.isSubmitting}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='password'
                label='Password'
                type='password'
                disabled={formik.isSubmitting}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
            </Grid>

            <Grid item xs={12} container justifyContent='end'>
              <Button variant='text' sx={{ textDecoration: 'underline' }}> Sing Up </Button>
            </Grid>

            <Grid item xs={12} container justifyContent='center'>
              <Button
                color='info'
                type='submit'
                variant='contained'
                sx={{ width: 130 }}
                disabled={formik.isSubmitting}
                endIcon={formik.isSubmitting && (
                  <CircularProgress
                    size={18}
                    sx={(theme) => ({ color: theme.palette.info.contrastText })}
                  />
                )}
              >
                Sing In
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Grid>
  )
}

export default SingInPage;
