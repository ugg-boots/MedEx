import React, {useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from './ShoppingList.jsx';
import HomeContainer from './HomeContainer.jsx';
import Catalog from '../components/Catalog/Catalog.js'
import SupplierView from '../components/Supplier/SupplierView.js';
import Procedures from './Procedures/Procedures.jsx';
import Inventory from './Inventory/Inventory.jsx';
import SupplierView from './Supplier/SupplierView.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchProducts, fetchSupplierName } from '../slices/catalogSlices.js'
import { fetchProcedureData, fetchProductData } from '../slices/procedureSlice.js';
<<<<<<< HEAD
import { fetchInventory } from '../slices/inventorySlice.js';
import { fetchSuppliers } from '../slices/supplierSlice.js';
import { useDispatch } from 'react-redux'
import Inventory from './Inventory/Inventory.jsx';
=======
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers  } from '../slices/supplierSlice.js';
import { fetchInventory } from '../slices/inventorySlice.js';
>>>>>>> dev



//functional component will take care of all the routing to all components

function MainContainer() {

	const userId = useSelector((state) => state.auth.userId)
	console.log(userId);
	const dispatch = useDispatch();

	// on component did mount, fetch all app data
	useEffect(() => {
<<<<<<< HEAD
		dispatch(fetchProcedureData());
		dispatch(fetchProductData());
		dispatch(fetchSupplierName());
    dispatch(fetchProducts());
		dispatch(fetchInventory())
		dispatch(fetchSuppliers());
=======
		dispatch(fetchProcedureData(userId));
		dispatch(fetchProductData(userId));
		dispatch(fetchSupplierName(userId));
    	dispatch(fetchProducts(userId));
		dispatch(fetchInventory(userId));
		dispatch(fetchSuppliers(userId))
>>>>>>> dev
	}, []);
  
	return (
		<Router>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Banner />

				<NavSideBar />
				<Box component="main" sx={{ flexGrow: 1, p: 2 }}>
					<Toolbar />

					<Switch>
						<Route exact path="/main" exact component={HomeContainer} />
						<Route path="/shopping" component={ShoppingList} />
						<Route path="/catalog" component={Catalog} />
						<Route path="/inventory" component={Inventory} />
						<Route path="/procedures" component={Procedures} />
						<Route path="/suppliers" component={SupplierView} />
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
