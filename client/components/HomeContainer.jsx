import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {
  return (
    <div className='homeContainer'>
      <div>
        <ExpirationView />
      </div>
      <div className='lowStockView'>
        <LowStockView />
      </div>
    </div>
    )
};

export default HomeContainer;
