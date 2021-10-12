import React from 'react';
import LowStockView from './LowStockView.jsx';
import ChartView from './ChartView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {
  return (
    <div className='homeContainer'>
      <Link to="/">
        <ExpirationView />
      </Link>
        <div className='lowStockView'>
                <LowStockView />
        </div>
    </div>
    )
};

export default HomeContainer;
