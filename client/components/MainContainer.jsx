import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from '@mui/material';
import TableContainer from './TableContainer.jsx';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from "./ShoppingList.jsx";
import HomeContainer from './HomeContainer.jsx';

function MainContainer() {
    const [table, setTable] = useState('');
    const [display, setDisplay] = useState('home');
    
    
    //add functionality



    //delete functionality    
    const handleDeleteEntry = async (entryId) => {
      try {
        await axios.delete(`/api/entry/${entryId}`);
        const newEntries = entries.filter((entry) => entry.entryId !== entryId);
        setEntries(newEntries);
      } catch (e) {
        console.log('An error occurred when deleting ', entryId);
      }
    };
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
          newTable = '';
          newDisplay = 'shop';
      }

      setDisplay(newDisplay);
      setTable(newTable);
    }

    let mainContent;

    if (display === 'table') mainContent = <TableContainer table={table}/>
    if (display === 'shop') mainContent = <ShoppingList/>
    if (display === 'home') mainContent = <HomeContainer/>

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
