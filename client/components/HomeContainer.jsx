import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';
import { TargetStockChart } from './TargetStockChart/TargetStockChart.js';
import { Container } from '@mui/material';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {

  return (
    <>
      <div className='home-Container'>
          <ExpirationView />
        <LowStockView />
      </div>
      <div className='chart'>
        <Container fixed>
          <TargetStockChart />
        </Container>
      </div>
    </>
  )
};

export default HomeContainer;
