import React, { Component } from 'react';
import BarChart from './BarChart.js';


class D3_App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [30, 300, 51, 25, 5, 3],//this.props.data
      width: 300,
      height: 500,
      id: "home"
    }
  }
    
    render() {
        return (
          <div className="App_D3">
          <BarChart id={this.state.id}data={this.state.data} width={this.state.width} height={this.state.height} />
          </div>
        );
      }
};
    
    export default D3_App;