import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';
import { LowStockBarChart } from './LowStock/LowStockChart.js';
import { Container } from '@mui/material';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {

  return (
    <>
      <div className='home-Container'>
        <Link to="/">
          <ExpirationView />
        </Link>
        <LowStockView />
      </div>
      <div className='chart'>
        <Container fixed>
          <LowStockBarChart />
        </Container>
      </div>
    </>
  )
};

export default HomeContainer;
