import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import medexLogo from '../../assests/medexLogo.png'

import { makeStyles } from '@mui/styles';
function Banner() {
	
	//created a costume color for button on hover
  const useStyles = makeStyles((theme) => ({
		flexGrow: {
			flex: '1',
		},
		button: {
			padding: '6px 12px',
			backgroundColor: '#3c52b2',
			color: '#fff',
			'&:hover': {
				backgroundColor: '#bbdefb',
				color: '#212121',
				borderRadius: '2px',
			},
		},
	}));

	const classes = useStyles();

	/* 
  deleteAllCookies()

  helper function to find cookies and delete them, PLEASE NOTE, will not be able to find
  cookies that are HTTP only protected
  */

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <img src={medexLogo} width="100" height="27.5"/>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          
          </Typography>
          <Button 
          color="inherit"
          onClick={() => {
            localStorage.clear();
            deleteAllCookies();
            window.location = '/'
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
  );
}

export default Banner;
