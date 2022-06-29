import React from 'react';
import { Box, Drawer, Toolbar, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

//this component
function NavSideBar() {
	const drawerWidth = 195;

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
						<Link class ="navLink" to="/main">Home</Link>
					</ListItem>
					<ListItem>
						<Link class ="navLink" to="/shopping">Shopping List</Link>
					</ListItem>
					<ListItem>
						<Link class="navLink" to="/inventory">Current Inventory</Link>
					</ListItem>
					<ListItem>
						<Link class="navLink" to="/procedures">Procedures</Link>
					</ListItem>
					<ListItem>
						<Link class="navLink" to="/catalog">Catalog</Link>
					</ListItem>
					<ListItem>
						<Link class="navLink" to="/suppliers">Suppliers</Link>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}

export default NavSideBar;