import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { auth, ENABLE_AUTH } from '../../lib/auth';
import { Logo } from '../../components/logo';
import { useAuthContext } from '../../contexts/auth-context';
import Router from 'next/router';

const Page = () => {
  const [tab, setTab] = useState('email');
  const [emailSent, setEmailSent] = useState(false);
  const authContext = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      alert("Запрос на сервер")
        
    }
  });

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const handleRetry = () => {
    setEmailSent(false);
  };

  const handleSkip = () => {
    // Since skip is requested, we set a fake user as authenticated
    const user = {};

    // Update Auth Context state
    authContext.signIn(user);

    // Persist the skip for AuthProvider initialize call
    globalThis.sessionStorage.setItem('skip-auth', 'true');

    // Redirect to home page
    Router
      .push('/')
      .catch(console.error);
  };

  return (
    <>
      <Head>
        <title>Sign in | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto'
        }}
      >
        <Grid
          container
          sx={{ flex: '1 1 auto' }}
        >
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              backgroundColor: 'neutral.50',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                p: 3
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box
              sx={{
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}
              >
                {emailSent ? (
                  <div>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="h4"
                    >
                      Confirm your email
                    </Typography>
                    <Typography>
                      We emailed a magic link to&nbsp;
                      <Box
                        component="span"
                        sx={{
                          color: 'primary.main'
                        }}
                      >
                        {formik.values.email}
                      </Box>
                      <br />
                      Click the link to to log in.
                    </Typography>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: 3,
                        mt: 3
                      }}
                    >
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        Wrong email?
                      </Typography>
                      <Button
                        color="inherit"
                        onClick={handleRetry}
                      >
                        Use a different email
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <div>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="h4"
                    >
                      Добро пожаловать
                    </Typography>
                    <Tabs
                      onChange={handleTabChange}
                      sx={{ mb: 3 }}
                      value={tab}
                    >
                      <Tab
                        label="Email"
                        value="email"
                      />
                    </Tabs>
                    {tab === 'email' && (
                      <div>
                        <TextField
                          error={Boolean(formik.touched.email && formik.errors.email)}
                          fullWidth
                          helperText={formik.touched.email && formik.errors.email}
                          label="Email Адрес"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="email"
                          value={formik.values.email}
                          variant="outlined"
                        />
                        <FormHelperText sx={{ mt: 1 }}>
                          Введите ваш email адрес
                        </FormHelperText>
                        {formik.errors.submit && (
                          <Typography
                            color="error"
                            sx={{ mt: 2 }}
                            variant="body2"
                          >
                            {formik.errors.submit}
                          </Typography>
                        )}
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          onClick={() => formik.handleSubmit()}
                          variant="contained"
                        >
                          Продолжить
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </Grid>
         
        </Grid>
      </Box>
    </>
  );
};

export default Page;
