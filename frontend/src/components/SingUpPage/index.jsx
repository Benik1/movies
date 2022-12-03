import { useFormik } from 'formik';
import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { singUp } from '../../store/user';

const singUpSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  repeatedPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = { firstName: '', lastName: '', email: '', password: '' };

function SingUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { profile  } = user;

  const onSubmit = (values, helpers) => {
    dispatch(singUp({
      email: values.email,
      password: values.password,
      lastName: values.lastName,
      firstName: values.firstName,
    }))
      .then(() => navigate('/'))
      .finally(() => {
        helpers.resetForm();
        helpers.setSubmitting(false);
      })
  }

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: singUpSchema
  })

  return !profile ? (
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
      <Paper elevation={3} sx={{ width: 700 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} px={16} pt={20} pb={10}>

            <Grid item xs={12}>
              <TextField
                name='firstName'
                fullWidth
                label='First Name'
                disabled={formik.isSubmitting}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.firstName && formik.errors.firstName}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='lastName'
                fullWidth
                label='Last Name'
                disabled={formik.isSubmitting}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.lastName && formik.errors.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              />
            </Grid>

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

            <Grid item xs={12}>
              <TextField
                fullWidth
                name='repeatedPassword'
                label='Repeated password'
                type='password'
                disabled={formik.isSubmitting}
                value={formik.values.repeatedPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.repeatedPassword && formik.errors.repeatedPassword}
                error={formik.touched.repeatedPassword && Boolean(formik.errors.repeatedPassword)}
              />
            </Grid>

            <Grid item xs={12} container justifyContent='end'>
              <Link to='/sing-in'>
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({
                    marginLeft: 0.2,
                    textDecoration: 'underline',
                    color: theme.palette.info.main,
                  })}
                >
                  Back to sing in
                </Typography>
              </Link>
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
                Sing Up
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Grid>
  ) : (
    <Navigate to='/' replace />
  )
}

export default SingUpPage;
