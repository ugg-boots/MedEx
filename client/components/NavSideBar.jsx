import React from 'react';
import { Box, Drawer, Toolbar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

//this component
function NavSideBar(props) {
	const drawerWidth = 175;
		const color = {
			background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
			
		};
	return (
		<Drawer
		style={{color}}
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', color },
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
				</List>
			</Box>
		</Drawer>
	);
}

export default NavSideBar;
