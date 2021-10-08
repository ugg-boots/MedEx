import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import TableContainer from './TableContainer.jsx';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from './ShoppingList.jsx';
import HomeContainer from './HomeContainer.jsx';
import CatalogAddForm from './CatalogAddForm.jsx';
import InventoryAddForm from './InventoryAddForm.jsx';
import SupplierAddForm from './SupplierAddForm.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//functional component will take care of all the routing to all components
function MainContainer() {
	return (
		<Router>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Banner />

				<NavSideBar />
				<Box component="main" sx={{ flexGrow: 1, p: 2 }}>
					<Toolbar />

					<Switch>
						<Route exact path="/" exact component={HomeContainer} />
						<Route exact path="/shopping" exact component={ShoppingList} />
						<Route exact path="/catalog" exact component={CatalogAddForm} />
						<Route exact path="/inventory" exact component={InventoryAddForm} />
						<Route exact path="/procedures" exact component={TableContainer} />
						<Route exact path="/suppliers" exact component={SupplierAddForm} />
					</Switch>
				</Box>
			</Box>
		</Router>
	);
}

export default MainContainer;
// <Route exact path="/" exact component={HomeContainer} />
// 				<Route exact path="/shopping" exact component={ShoppingList} />
// 				<Route exact path="/inventory" exact component={CatalogAddForm} />
// const buttonClick = (event, key) => {

//  const [table, setTable] = useState('inventory');
//  const [display, setDisplay] = useState('table');

//   console.log('button clicked!')
//   console.log(key)
//   let newTable;
//   let newDisplay;

//   switch (key) {
//     case 'Home':
//       newTable = '';
//       newDisplay = 'home';
//       break;
//     case 'Current Inventory':
//       newTable = 'inventory';
//       newDisplay = 'table';
//       break;
//     case 'Procedures':
//       newTable = 'procedures';
//       newDisplay = 'table';
//       break;
//     case 'Catalog':
//       newTable = 'catalog';
//       newDisplay = 'table';
//       break;
//     case 'Suppliers':
//       newTable = 'suppliers';
//       newDisplay = 'table';
//       break;
//     case 'Shopping List':
//       newTable = '';
//       newDisplay = 'shop';
//   }

//   setDisplay(newDisplay);
//   setTable(newTable);
// }

// let mainContent;
// if (display === 'table') mainContent = <TableContainer table={table}/>
// if (display === 'shop') mainContent = <ShoppingList/>
// if (display === 'home') mainContent = <HomeContainer/>
