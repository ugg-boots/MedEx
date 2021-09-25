import React, { useState} from "react";
import { Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TableContainer from './TableContainer.jsx';

const drawerWidth = 200;

export default function ClippedDrawer() {
    const [table, setTable] = useState('suppliers');
    const [display, setDisplay] = useState('table');

    let mainContent;
    if (display === 'table') mainContent = <TableContainer table={table}/>
  
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Medical Practice Inventory Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <List>
            {['Home', 'Current Inventory', 'Procedures', 'Catalog', 'Suppliers'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {mainContent}
      </Box>
    </Box>
  );
}
