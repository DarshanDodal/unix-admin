import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import {
  CognitoUser,
  AuthenticationDetails,
  CookieStorage
} from 'amazon-cognito-identity-js';
import UserPool from './cognitoClient';
import { Auth } from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = ({ location }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const navigate = useNavigate();

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      setSeverity('success');
      setMessage('Account confirmed.');
      setOpen(true);
      navigate('/login', { replace: true });
    } catch (error) {
      setSeverity('error');
      setMessage(error.message);
      setOpen(true);
    }
  }

  async function resendConfirmationCode(user) {
    try {
      await Auth.resendSignUp(user);
      setSeverity('success');
      setMessage('Code resent successfully.');
      setOpen(true);
    } catch (err) {
      setSeverity('error');
      setMessage(err.message);
      setOpen(true);
    }
  }

  console.log(location);
  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              confirmationCode: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
            onSubmit={(values, action) => {
              console.log('Values:', values);
              confirmSignUp(values.email, values.confirmationCode);

              action.setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Account Confirmation
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography> */}
                </Box>
                {/* <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={1}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box> */}
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.confirmationCode && errors.confirmationCode
                  )}
                  fullWidth
                  helperText={
                    touched.confirmationCode && errors.confirmationCode
                  }
                  label="Confirmation Code"
                  margin="normal"
                  name="confirmationCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="confirmationCode"
                  value={values.password}
                  variant="outlined"
                />
                <Typography color="textPrimary" variant="h6">
                  Please check your email for the code.
                </Typography>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting || submitted}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      confirmSignUp(values.email, values.confirmationCode);
                    }}
                  >
                    Verify
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body1">
                  Didn&apos;t receive the code?{' '}
                  <Link
                    onClick={() => {
                      resendConfirmationCode(values.email);
                    }}
                    variant="h6"
                  >
                    Resend
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert onClose={handleSnackBarClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Page>
  );
};

export default LoginView;
