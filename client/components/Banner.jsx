import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
				backgroundColor: 'rgb(245, 245, 245)',
				color: '#212121',
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
		var cookies = document.cookie.split(';');

		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf('=');
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		}
	}
// #f5f5f5
// #2c387e
	return (
		<AppBar style={{ background: '#fff', color: 'black' }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
					MedEx
				</Typography>
				<Button
					className={classes.button}
					color="inherit"
					onClick={() => {
						localStorage.clear();
						deleteAllCookies();
						window.location = '/';
					}}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Banner;
