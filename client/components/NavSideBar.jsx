import React from 'react';
import { Box, Drawer, Toolbar, Button, } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles.scss';
//this component
function NavSideBar(props) {

	const drawerWidth = 180;
	//added color to navbar 
	// '#e0f2f1';
	// #2c387e
	const color = {
		background: ' #fff',
	};

	
	return (
		<Drawer
			style={{ color }}
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', color },
			}}
		>
			<Toolbar />
			<Box sx={{ display: 'flex', flexDirection: 'column', height: '700px', p: 6 }}>
				<div className="button1">
					<Button color="primary" to="/" component={Link}>
						Home
					</Button>
				</div>
					<div className="button1">
				<Button  color="primary" to="/shopping" component={Link}>
					Shop
				</Button>
				</div>
					<div className="button1">
				<Button color="primary" to="/inventory" component={Link}>
					Inventory
				</Button>
				</div>
					<div className="button1">
				<Button color="primary" to="/procedures" component={Link}>
					Procedures
				</Button>
				</div>
				<div className="button1">
				<Button color="primary" to="/catalog" component={Link}>
					Catalog
				</Button>
					</div>
					<div className="button1">
				<Button size="medium" color="primary" to="/suppliers" component={Link}>
					Suppliers
				</Button>
				</div>
			</Box>
		</Drawer>
	);
}

export default NavSideBar;

