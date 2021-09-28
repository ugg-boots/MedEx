import React, { Component } from 'react';
import InventoryAddForm from "./InventoryAddForm.jsx";
import { Button } from '@material-ui/core';

class InventoryAddModal extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        showModal: false,
      }
      
      this.showModal = this.showModal.bind(this);
    }
    
    showModal(event) {
      event.preventDefault();
      
      this.state.showModal
        ? (
          this.setState({
            showModal: false,
          })
          )
          : (
            this.setState({
              showModal: true,
            })
          )
    }

    render() {
        return(
          <div className="modalButton">
            <Button variant="outlined" color="secondary" size="small" onClick={this.showModal}>Add Inventory</Button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    <InventoryAddForm getData = {this.props.getData} closeModal = {this.showModal}/>
                    <div className="exitButton">
                    <Button onClick={this.showModal} variant="outlined" color="secondary" size="small">Exit</Button>
                    </div>
                  </div>
                </div>
              </div>
            )
            : (
              null
            )
        }
        </div>
        )
    }
  }

export default InventoryAddModal;