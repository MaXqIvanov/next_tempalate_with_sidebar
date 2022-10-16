import { Fragment } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { Provider, useDispatch } from 'react-redux';
import { setupStore } from '../store/store';
import '../scss/all.scss';
import {useEffect} from 'react'
import api from '../plugin/axios/api';
registerChartJs();

const clientSideEmotionCache = createEmotionCache();
const store = setupStore()

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Head>
          <title>
            Asist
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <AuthConsumer>
                {
                  (auth:any) => auth.isLoading
                    ? <Fragment />
                    : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </CacheProvider>
  );
};

export default App;
