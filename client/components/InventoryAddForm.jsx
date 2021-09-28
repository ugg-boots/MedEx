import React, { Component } from 'react';
import { TextField } from '@mui/material';
import { Typography, Button } from '@material-ui/core';

class InventoryAddForm extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        productName: '',
        quantity: '',
        expyDate: '',
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();

      //validate data
      if (this.state.productName === '') alert('Product Name is required');
      if (this.state.quantity === '') alert('Quantity is required');
      if (this.state.expyDate === '') alert('Expiration date is required');
 
      else {
      const body = {
        product_name: this.state.productName,
        quantity: this.state.quantity, 
        expiration_date: this.state.expyDate
      };

      console.log(body);
      console.log(JSON.stringify(body));

      fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
          this.props.getData();
        })
        .catch(err => console.log('addInventoryForm fetch /api/inventory: ERROR: ', err));
      }
    }

    render() {
      return (
        <div>
        <Typography variant="h4">Add Inventory</Typography>
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
            <TextField
              id="outlined-name"
              name="productName"
              label="Product Name"
              value={this.state.productName}
              onChange={this.handleInputChange}
              sx={{pb:2}}
            />
          <br/>
          <TextField
              id="outlined-name"
              name="quantity"
              label="Quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
              sx={{pb:2}}
            />
           <br/> 
           <TextField
              id="outlined-name"
              name="expyDate"
              label="Expiration Date"
              value={this.state.expyDate}
              onChange={this.handleInputChange}
              sx={{pb:2}}
            />
           <br/> 
          <Button sx={{pb:2}} variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
    }
  }

  export default InventoryAddForm;