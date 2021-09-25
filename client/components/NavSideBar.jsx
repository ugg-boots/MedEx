import React from "react";
import { Box, Drawer, Toolbar, List, ListItem, ListItemText } from '@mui/material';

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
            <Box sx={{ overflow: 'auto', p: 2 }}>
                <List>
                    {['Home', 'Current Inventory', 'Procedures', 'Catalog', 'Suppliers'].map((text) => (
                    <ListItem button key={text} onClick={(event) => {props.buttonClick(event, text)}}>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default NavSideBar;