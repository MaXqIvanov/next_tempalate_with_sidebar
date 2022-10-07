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
import { useDispatch } from 'react-redux';
import { userAuth } from '../../store/authSlice';
import {useRouter}  from 'next/router';

const Page = () => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('email');
  const [emailSent, setEmailSent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const authContext = useAuthContext();

  const onSubmit = async (values, helpers) => {
    dispatch(userAuth({password: password, username: username, router: router}))
  }

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
        <title>Войти | Asist</title>
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
              <Logo
                sx={{
                height: 42,
                width: 42
                }}
              />
              {/* <NextLink
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
              </NextLink> */}
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
                  <div>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="h4"
                    >
                      Добро пожаловать в Asist
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
                          fullWidth
                          label="Имя пользователя"
                          name="email"
                          onChange={(e)=>setUsername(e.target.value)}
                          type="text"
                          value={username}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          label="пароль"
                          margin="normal"
                          name="password"
                          onChange={(e)=> setPassword(e.target.value)}
                          type="password"
                          value={password}
                          variant="outlined"
                        />
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          onClick={() => onSubmit()}
                          variant="contained"
                        >
                          Продолжить
                        </Button>
                      </div>
                    )}
                  </div>
              </Box>
            </Box>
          </Grid>
         
        </Grid>
      </Box>
    </>
  );
};

export default Page;
