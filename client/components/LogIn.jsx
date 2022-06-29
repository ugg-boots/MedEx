import React, { useState } from 'react';
import { Alert, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { validateUser, resetLoginError } from '../slices/authSlice.js';
import medexLogo from '../../assests/medexLogo.png'

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const loginError = useSelector((state) => state.auth.loginError);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const body = {
        username: email,
        password: password
    }
    
    dispatch(validateUser(body));
  };

  const handleWarningClose = (event) => {
    warning = null;
    dispatch(resetLoginError());
    setEmail('');
    setPassword('');
  }

  let loggedIn;
  if (userId) {
    loggedIn = <Redirect to={'/main'} />
  }

  let warning;
  if (loginError) {
    warning = <Alert severity="warning" onClose={(event) => {handleWarningClose(event)}}>Invalid login</Alert>
  }


  return (
    <ThemeProvider theme={theme}>
      {loggedIn}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img width="400" height="110" src={medexLogo} />
          <br/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {warning}
          <Box component="form" onSubmit={event => handleSubmit(event)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
