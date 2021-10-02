import React from 'react';
import LowStockView from './LowStockView.jsx';
import ChartView from './ChartView.jsx';
import ExpirationView from './ExpirationView.jsx';

function HomeContainer () {
    return (
        <div className='homeContainer'>
            <div>
                <ExpirationView />
                <LowStockView />
            </div>
            <ChartView/>
        </div>
    )
}

export default HomeContainer;