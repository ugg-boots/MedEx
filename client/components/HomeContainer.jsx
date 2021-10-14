import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';
import LowStockChart from './LowStock/LowStockChart.js';
import { useState, useEffect } from 'react';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    
    setChartData({
      labels: 'placeholder',
      datasets: [
        {
          label: 'Current Inventory',
          data: 'placeholder',
          backgroundColor: '#37b4d4',
        },
        {
          label: 'Target Max Stock',
          data: 'placeholder',
          backgroundColor: '#d1349d',
        },

      ]
    })
  }, [])


  return (
    <div className='homeContainer'>
      <Link to="/">
        <ExpirationView />
      </Link>
      
      <div className='lowStockView'>
        <LowStockView />
        <LowStockChart />
      </div>
    </div>
    )
};

export default HomeContainer;
