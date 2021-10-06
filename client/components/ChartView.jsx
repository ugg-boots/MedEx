import React from 'react';
import {Typography} from '@mui/material';
import D3_App from '../react-d3/src/D3_App.js'

function ChartView () {
    return (
        <div>
        <Typography variant="h5">Data Visualization</Typography>
        <D3_App/>
        </div>
    )
}

export default ChartView