import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { PageNotFound, PrivateRoute } from 'components/Common';
import { AppLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './i18n/i18n';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="">
            <AppLayout />
          </PrivateRoute>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
        <ToastContainer />
      </LocalizationProvider>
    </>
  );
}

export default App;
