import React from 'react';
import LowStockView from './LowStockView.jsx';
import ChartView from './ChartView.jsx';
import ExpirationView from './ExpirationView.jsx';

function HomeContainer () {
    return (
        <div className='homeContainer'>
                <div className='expyView'>
                <ExpirationView />
                </div>
                <div className='lowStockView'>
                <LowStockView />
                </div>
                <div className='chartView'>
                <ChartView/>
                </div>
        </div>
    )
}

export default HomeContainer;