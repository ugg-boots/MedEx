import React, { useState } from 'react';
import { Alert, Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, Link } from 'react-router-dom';

const theme = createTheme();

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null)
  
  const register = (event) => {
    event.preventDefault();

    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setWarningMessage(<Alert severity="warning" onClose={() => {handleWarningClose()}}>All fields are required</Alert>);
    }

    else {
      const body = {
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password
      }
    
      fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'Application/JSON'
          },
        })
      .then(resp => resp.json())
      .then(data => {
        if (data === 'exists') {
          setWarningMessage(<Alert severity="warning" onClose={() => {handleWarningClose(event)}}>User already exists</Alert>);
        }
        else if (data === 'registered') {
          setRegistered(<Redirect to={'/login'} />)
        }
      })
      .catch(err => console.log(`Register fetch /api/register: ERROR: `, err));
    }
      
     
  };

  const handleWarningClose = (event) => {
    setWarningMessage(null);
  }

  return (
    <ThemeProvider theme={theme}>
      {registered}
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {warningMessage}
          <Box component="form" noValidate onSubmit={event => register(event)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
