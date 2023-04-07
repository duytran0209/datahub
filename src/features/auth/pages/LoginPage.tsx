import { Box, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { LoginPayload } from 'models';
import React from 'react';
import { authActions } from '../authSlice';
import LoginForm from '../components/LoginForm';

const theme = createTheme();

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const handleSubmit = (formValues: LoginPayload) => {
    dispatch(authActions.login(formValues));
  };

  const initialValues: LoginPayload = {
    username: '',
    password: '',
    rememberMe: false,
  } as LoginPayload;

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={7}
          md={5}
          sx={{
            backgroundImage: `url(/assets/img/banner.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={5} md={7} component={Paper} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LoginForm initialValues={initialValues} onSubmit={handleSubmit}></LoginForm>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
