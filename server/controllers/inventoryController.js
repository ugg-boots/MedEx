const express = require("express");
const fs = require('fs');
const path = require('path');
const pool = require("../models/inventoryModel")

const inventoryController = {};

inventoryController.getAllInventory = async (req, res, next) => {
  try {
    const inventory = await pool.query('SELECT * FROM inventory');
    // need to query for product_name. involving an inner join?

    // STRETCH FEATURE: have filter / dropdown on front end that toggles out-of-stock vs in-stock items. Update db query accordingly.
    res.locals.inventory = inventory.rows;
  } catch (err) {
    next(err);
  }
  next();
};

inventoryController.getInventoryById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const inventoryById = await pool.query("SELECT * FROM inventory WHERE supplier_id = $1",
        [id]
        );
        res.json(inventoryById.row)
      } catch (err) {
        console.error(err.message);
      }
    };

inventoryController.addNewInventory = async (req, res, next) => {
  try {
    const { product_id, quantity, expiration_date } = req.body;
    const newInventory = await pool.query('INSERT INTO inventory (product_id, quantity, expiration_date) VALUES($1,$2,$3)', [product_id, quantity, expiration_date]);
    res.locals.newInventory = newInventory;
    res.json(newInventory);
  } catch (err) {
    console.log(err)
    next(err)
  }
  next();
};

inventoryController.deleteInventory = async (req, res, next) => {
      try {
        const { id } = req.params;
        const deleteSupplier = await pool.query("DELETE FROM inventory WHERE item_id = $1", [id]);
        res.json(`Inventory with id ${id} deleted`);
      } catch(err) {
        console.log(err)
        next(err)
      }
      next();
    };

// // MVP: handle one obj from req.body to be deleted
// // STRETCH: handle multiple rows from req.body (array of objects) to be deleted
// inventoryController.deleteInventory = async (req, res, next) => {
//   try {

//   } catch(err) {

//   }
//   next();
// };

// // inventoryController.updateInventory = async (req, res, next) => {
// //   try { } catch(err) {}
// //   next();
// // };

module.exports = inventoryController;