import React from 'react';
import LowStockView from './LowStockView.jsx';
import ExpirationView from './ExpirationView.jsx';
import { Link } from 'react-router-dom';
import { LowStockBarChart } from './LowStock/LowStockChart.js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//declared a functional component that will lift the state of ExpirationView
const HomeContainer = (props)=> {

  const [chartData, setChartData] = useState({});

  const catalog = useSelector(state => state.catalog.allCatalogItems);
  const inventory = useSelector(state => state.inventory.displayedInventory)
  const labels = catalog.map(item => item.product_name);
  console.log('this is the labels: ', labels)

  useEffect(() => {
    console.log('this is the labels inside useEffect: ', labels)
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Current Inventory',
          data: [1, 5, 2, 4, 2,21,2,2,3,24,6,7],
          backgroundColor: '#37b4d4',
        },
        {
          label: 'Target Max Stock',
          data: [5, 20, 4, 2, 1, 4,5,2,2,1,4],
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
        <LowStockBarChart chartData={chartData} />
      </div>
    </div>
    )
};

export default HomeContainer;
