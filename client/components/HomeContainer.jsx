import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';


//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {
  return (
		<div className="main-container">
			<div className="home-container">
				<div className="expiration_view">
					<ExpirationView />
				</div>
				<div className="lowStockView">
					<LowStockView />
				</div>
			</div>
		</div>
	);
};

export default HomeContainer;
