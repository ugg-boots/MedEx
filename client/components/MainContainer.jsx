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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchProducts, fetchSupplierName } from '../slices/catalogSlices.js'
import { fetchProcedureData, fetchProductData } from '../slices/procedureSlice.js';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers  } from '../slices/supplierSlice.js';
import { fetchInventory } from '../slices/inventorySlice.js';

//functional component will take care of all the routing to all components

function MainContainer() {

	const userId = useSelector((state) => state.auth.userId)
	console.log(userId);
	const dispatch = useDispatch();

	// on component did mount, fetch all app data
	useEffect(() => {
		dispatch(fetchProcedureData(userId));
		dispatch(fetchProductData(userId));
		dispatch(fetchSupplierName(userId));
    	dispatch(fetchProducts(userId));
		dispatch(fetchInventory(userId));
		dispatch(fetchSuppliers(userId))
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