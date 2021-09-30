const express = require("express");
const pool = require("../models/inventoryModel")

const inventoryController = {};

inventoryController.getAllInventory = async (req, res, next) => {
  try {
    const inventory = await pool.query('SELECT item_id, catalog.product_name, quantity, expiration_date FROM inventory INNER JOIN catalog ON inventory.product_id = catalog.product_id');
    // SELECT item_id, catalog.product_name, quantity, expiration_date FROM catalog INNER JOIN inventory 
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
        next(err);
      }
      next();
    };

inventoryController.addNewInventory = async (req, res, next) => {
  try {
    const { product_name, quantity, expiration_date } = req.body;
    const newInventory = await pool.query(`INSERT INTO inventory (quantity, expiration_date, product_id) VALUES
    ($1, $2, (SELECT product_id FROM catalog WHERE product_name = $3))`, [quantity, expiration_date, product_name]);
    // SELECT product_id FROM catalog WHERE product_name = $4
    res.locals.newInventory = newInventory;
    } catch (err) {
    console.log(err)
    next(err)
  }
  next();
};

inventoryController.deleteInventory = async (req, res, next) => {
      try {
        console.log(req.body);
        const id = req.body[0];
        const deleteInventory = await pool.query("DELETE FROM inventory WHERE item_id = $1", [id]);
        res.locals.deleteInventory = deleteInventory;
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