import InventoryAddForm from "./InventoryAddForm.jsx";
import {InventoryTable} from "./InventoryTable.jsx";
import React from 'react';

export default function Inventory() {
  return (
    <div>
      <div className="inventory-add-form">
        <InventoryAddForm />
      </div>
      <div className="inventory-table">
        <InventoryTable />
      </div>
    </div>
  );
};
