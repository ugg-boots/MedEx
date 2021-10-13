import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import TableContainer from './TableContainer.jsx';
import Banner from './Banner.jsx';
import NavSideBar from './NavSideBar.jsx';
import ShoppingList from './ShoppingList.jsx';
import HomeContainer from './HomeContainer.jsx';
import Catalog from '../components/Catalog/Catalog.js';
import CatalogAddForm from '../components/Catalog/CatalogAddForm.jsx';
import InventoryAddForm from './InventoryAddForm.jsx';
import SupplierView from './Supplier/SupplierView.js';
import { useDispatch } from 'react-redux';
import { fetchSuppliers } from '../slices/supplierSlice.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//functional component will take care of all the routing to all components
function MainContainer() {
	//dispatching the supplies so data can populate when component is clicked!
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSuppliers(), []);
	});

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
						<Route exact path="/suppliers" exact component={SupplierView} />
					</Switch>
				</Box>
			</Box>
		</Router>
	);
}

export default MainContainer;
