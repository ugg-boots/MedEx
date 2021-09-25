import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Banner() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Medical Practice Inventory Tracker
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
  );
}

export default Banner;