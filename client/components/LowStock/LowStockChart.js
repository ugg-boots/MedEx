import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';

import { energyConsumption as data } from './LowStockChartData';

const LowStockChart = (props) => {
  // styling for the legend at bottom of chart
  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });

  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );

  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

  const legendLabelStyles = () => ({
    label: {
      whiteSpace: 'nowrap',
    },
  });

  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );

  const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

  
  return (
    <Paper>
      <Chart
        data={data} >
          
        <ArgumentAxis />
        <ValueAxis max={2400} />

        <BarSeries
          name="Hydro-electric"
          valueField="hydro"
          argumentField="country"
        />
        <BarSeries
          name="Oil"
          valueField="oil"
          argumentField="country"
        />
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Title text="Current Inventory vs. Low Stock" />
        <Stack
          stacks={[
            { series: ['Hydro-electric', 'Oil', 'Natural gas', 'Coal', 'Nuclear'] },
          ]}
        />
      </Chart>
    </Paper>
  );
}

export default LowStockChart;
