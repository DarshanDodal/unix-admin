import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import Page from 'src/components/Page';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from './cognitoClient';
import createBlankProfile from '../../utils/newBlankProfile.js';
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

const RegisterView = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Page className={classes.root} title="Register">
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
              firstName: '',
              lastName: '',
              phoneNumber: '',
              password: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              firstName: Yup.string()
                .max(255)
                .required('First name is required'),
              lastName: Yup.string()
                .max(255)
                .required('Last name is required'),

              password: Yup.string()
                .max(255)
                .required('password is required')
                .min(8, 'Min 8 characters are required'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                var attributeList = [];
                var dataFirstName = {
                  Name: 'custom:firstName',
                  Value: values.firstName
                };

                var dataLastName = {
                  Name: 'custom:lastName',
                  Value: values.lastName
                };
                var dataPhoneNumber = {
                  Name: 'phone_number',
                  Value: values.phoneNumber
                };
                var attributeFirstName = new CognitoUserAttribute(
                  dataFirstName
                );
                var attributeLastName = new CognitoUserAttribute(dataLastName);
                var attributePhoneNumber = new CognitoUserAttribute(
                  dataPhoneNumber
                );

                attributeList.push(attributeFirstName);
                attributeList.push(attributeLastName);
                attributeList.push(attributePhoneNumber);
                UserPool.signUp(
                  values.email,
                  values.password,
                  attributeList,
                  null,
                  function(err, result) {
                    if (err) {
                      setSeverity('error');
                      setMessage(err.message);
                      setOpen(true);
                      // console.log(err);
                      return;
                    }
                    setSeverity('success');
                    setMessage(
                      'Account created sucessfully!. Please check your email for account confirmation code.'
                    );
                    setOpen(true);
                    navigate('/confirm-account', { replace: true });
                  }
                );
                actions.setSubmitting(false);

                // navigate('/app/dashboard', { replace: true });
              }, 1000);
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
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
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
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Phone"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                  placeholder="Format: +91982*****23"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
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

export default RegisterView;
