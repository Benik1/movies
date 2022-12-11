import { useEffect } from "react";
import { useFormik } from "formik";
import {
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import NavBar from '../NavBar';
import { getProfile, updateProfile } from 'store/user';
import { useSelector, useDispatch } from 'react-redux';

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { profile } = user;

  useEffect(() => {
    if(!profile) {
      dispatch(getProfile());
    }
  }, []);

  const onSubmit = (values, helpers) => {
    dispatch(updateProfile(values))
      .then(() => {
        helpers.setSubmitting(false);
      })
  }

  const formik = useFormik({
    onSubmit,
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || ''
    },
  })

  return (
    <>
    <NavBar />
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.grey[400],
      })}
    >
      <Paper elevation={3} sx={{ width: 700 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} p={10} px={15}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.firstName && formik.errors.firstName}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.lastName && formik.errors.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>

            <Grid item container xs={12} justifyContent="center">
              <Button
                color="info"
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                endIcon={formik.isSubmitting && (
                  <CircularProgress
                    size={18}
                    sx={(theme) => ({ color: theme.palette.info.contrastText })}
                  />
                )}
              >
                Update
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Grid>
    </>
  );
}

export default Profile;
