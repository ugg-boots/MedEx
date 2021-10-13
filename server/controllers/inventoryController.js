const pool = require("../models/inventoryModel")

const inventoryController = {};

inventoryController.getAllInventory = async (req, res, next) => {
  
  const inventoryQuery = `SELECT item_id, inventory.product_id, catalog.product_name, quantity, expiration_date FROM inventory 
    INNER JOIN catalog ON inventory.product_id = catalog.product_id`;
  
  try {
    const inventory = await pool.query(inventoryQuery);
    res.locals.inventory = inventory.rows;
    next();
  } 
  
  catch (err) {
    next({
      log: 'inventoryController.getAllInventory: ERROR:' + err.message,
      message: { err: 'inventoryController.getAllInventory: ERROR: Check server logs for details' },
    });
  }
};

inventoryController.getOneInventory = async (req, res, next) => {
  
  const inventoryQuery = `SELECT item_id, inventory.product_id, catalog.product_name, quantity, expiration_date FROM inventory
  INNER JOIN catalog ON inventory.product_id = catalog.product_id WHERE inventory.product_id = ${req.query.product_id}`;
  
  try {
    const inventory = await pool.query(inventoryQuery);
    res.locals.product = inventory;
    next();
  } 
  
  catch (err) {
    next({
      log: 'inventoryController.getAllInventory: ERROR:' + err.message,
      message: { err: 'inventoryController.getAllInventory: ERROR: Check server logs for details' },
    });
  }
};

inventoryController.addNewInventory = async (req, res, next) => {
  
  const { product_name, quantity, expiration_date } = req.body;
  const params = [quantity, expiration_date, product_name];
  const addInventoryQuery = `INSERT INTO inventory (quantity, expiration_date, product_id) 
    VALUES($1, $2, (SELECT product_id FROM catalog WHERE product_name = $3))
    RETURNING *`;
  
  try {
    const newInventory = await pool.query(addInventoryQuery, params);
    res.locals.newInventory = newInventory;
    next();
  } 
    
  catch (err) {
    next({
      log: 'inventoryController.addNewInventory: ERROR:' + err.message,
      message: { err: 'inventoryController.addNewInventory: ERROR: Check server logs for details' },
    });
  }
};



inventoryController.deleteInventory = async (req, res, next) => {
  
  const id = req.body[0];
  const param = [id];
  const deleteInventoryQuery = 'DELETE FROM inventory WHERE item_id = $1';
  
  try { 
    const deletedInventory = await pool.query(deleteInventoryQuery, param);
    res.locals.deletedInventory = deletedInventory;
    next();
  } 
  catch(err) {
    next({
      log: 'inventoryController.deleteInventory: ERROR:' + err.message,
      message: { err: 'inventoryController.deleteInventory: ERROR: Check server logs for details' },
    });
  }
};

module.exports = inventoryController;