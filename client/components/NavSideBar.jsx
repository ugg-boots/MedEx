import React from 'react';
import { Box, Drawer, Toolbar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

//this component
function NavSideBar(props) {
	const drawerWidth = 175;

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
			}}
		>
			<Toolbar />
			<Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
				<List>
					<ListItem>
						<Link to="/">Home</Link>
					</ListItem>
					<ListItem>
						<Link to="/shopping">Shopping List</Link>
					</ListItem>
					<ListItem>
						<Link to="/inventory">Current Inventory</Link>
					</ListItem>
					<ListItem>
						<Link to="/procedures">Procedures</Link>
					</ListItem>
					<ListItem>
						<Link to="/catalog">Catalog</Link>
					</ListItem>
					<ListItem>
						<Link to="/suppliers">Suppliers</Link>
					</ListItem>
					<ListItem>
						<Link to="/login">Log In</Link>
					</ListItem>
					<ListItem>
						<Link to="/register">Register</Link>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}

export default NavSideBar;
// {
// 	['Home', 'Shopping List', 'Current Inventory', 'Procedures', 'Catalog', 'Suppliers'].map((text) => (
// 		<ListItem button key={text}>
// 			<ListItemText primary={text} />
// 		</ListItem>
// 	));
// }
