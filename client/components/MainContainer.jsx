import React, {useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from './ShoppingList.jsx';
import HomeContainer from './HomeContainer.jsx';
import Catalog from '../components/Catalog/Catalog.js'
import Procedures from './Procedures/Procedures.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import { fetchProducts, fetchSuppliers } from '../slices/catalogSlices.js'
import { fetchProcedureData, fetchProductData } from '../slices/procedureSlice.js';
import { fetchInventory } from '../slices/inventorySlice.js';
import { useDispatch } from 'react-redux'
=======
import { fetchProducts, fetchSupplierName, postCatalog } from '../slices/catalogSlices.js'
import { fetchProcedureData, fetchProductData } from '../slices/procedureSlice.js';
import { fetchSuppliers,  } from '../slices/supplierSlice.js';
import { fetchInventory } from '../slices/inventorySlice.js';
import { useDispatch } from 'react-redux';
import SupplierView from './Supplier/SupplierView.js';
>>>>>>> dev
import Inventory from './Inventory/Inventory.jsx';



//functional component will take care of all the routing to all components

function MainContainer() {

	const dispatch = useDispatch();

	// on component did mount, fetch all app data
	useEffect(() => {
		dispatch(fetchProcedureData());
		dispatch(fetchProductData());
<<<<<<< HEAD
		dispatch(fetchSuppliers());
    dispatch(fetchProducts());
		dispatch(fetchInventory())
=======
		dispatch(fetchSupplierName());
    dispatch(fetchProducts());
		dispatch(fetchInventory());
		dispatch(fetchSuppliers())
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
						<Route exact path="/" exact component={HomeContainer} />
						<Route exact path="/shopping" exact component={ShoppingList} />
						<Route exact path="/catalog" exact component={Catalog} />
						<Route exact path="/inventory" exact component={Inventory} />
						<Route exact path="/procedures" exact component={Procedures} />
						<Route exact path="/suppliers" exact component={SupplierView} />
					</Switch>
				</Box>
			</Box>
		</Router>
	);
}

export default MainContainer;
