import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from '@mui/material';
import TableContainer from './TableContainer.jsx';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from "./ShoppingList.jsx";

function MainContainer() {
    const [table, setTable] = useState('catalog');
    const [display, setDisplay] = useState('table');

    const buttonClick = (event, key) => {
      console.log('button clicked!')
      console.log(key)
      let newTable;
      let newDisplay;

      switch (key) {
        case 'Home':
          newTable = '';
          newDisplay = 'home';
          break;
        case 'Current Inventory':
          newTable = 'inventory';
          newDisplay = 'table';
          break;
        case 'Procedures':
          newTable = 'procedures';
          newDisplay = 'table';
          break;
        case 'Catalog':
          newTable = 'catalog';
          newDisplay = 'table';
          break;
        case 'Suppliers':
          newTable = 'suppliers';
          newDisplay = 'table';
          break;
        case 'Shopping List':
          newTable = null;
          newDisplay = 'shop';
      }

      setDisplay(newDisplay);
      setTable(newTable);
    }

    let mainContent;
    if (display === 'table') mainContent = <TableContainer table={table}/>
    if (display === 'shop') mainContent = <ShoppingList/>
  
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Banner/>
      <NavSideBar buttonClick={buttonClick}/>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar/>
        {mainContent}
      </Box>
    </Box>
  );
}

export default MainContainer;
