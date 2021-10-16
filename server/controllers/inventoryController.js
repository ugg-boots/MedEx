const { ConstructionOutlined } = require("@mui/icons-material");
const pool = require("../models/inventoryModel")

const inventoryController = {};

inventoryController.getAllInventory = async (req, res, next) => {

  const user_id = req.params.userId;
  const inventoryQuery = `SELECT item_id, inventory.product_id, catalog.product_name, quantity, expiration_date FROM inventory 
    INNER JOIN catalog ON inventory.product_id = catalog.product_id
    WHERE inventory.user_id = $1`;
  
  try {
    const inventory = await pool.query(inventoryQuery, [user_id]);
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

// inventoryController.getOneInventory = async (req, res, next) => {
  
//   const inventoryQuery = `SELECT item_id, inventory.product_id, catalog.product_name, quantity, expiration_date FROM inventory
//   INNER JOIN catalog ON inventory.product_id = catalog.product_id WHERE inventory.product_id = ${req.query.product_id}`;
  
//   try {
//     const inventory = await pool.query(inventoryQuery);
//     res.locals.product = inventory;
//     next();
//   } 
  
//   catch (err) {
//     next({
//       log: 'inventoryController.getAllInventory: ERROR:' + err.message,
//       message: { err: 'inventoryController.getAllInventory: ERROR: Check server logs for details' },
//     });
//   }
// };

inventoryController.addNewInventory = async (req, res, next) => {
  
  const { product_name, quantity, expiration_date, user_id } = req.body;
  const params = [quantity, expiration_date, product_name, user_id];
  const addInventoryQuery = `INSERT INTO inventory (quantity, expiration_date, product_id, user_id) 
    VALUES($1, $2, (SELECT product_id FROM catalog WHERE product_name = $3 AND user_id = $4), $4)
    RETURNING quantity, $3 as product_name,product_id, product_id, expiration_date, item_id`;
  
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
  const {item_id} = req.params; 
  param = [item_id]
  const deleteInventoryQuery = `DELETE FROM inventory WHERE item_id = $1
    RETURNING inventory.product_id, item_id`;
  
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


inventoryController.updateInventory = async (req, res, next) => {
  const {item_id, quantity} = req.body; 
  param = [item_id, quantity]
  const updateInventoryQuery = `UPDATE inventory SET quantity = $2 WHERE item_id = $1
  RETURNING *`;
  
  try { 
    const updatedInventory = await pool.query(updateInventoryQuery, param);
    res.locals.updatedInventory = updatedInventory;
    next();
  } 
  catch(err) {
    next({
      log: 'inventoryController.updateInventory: ERROR:' + err.message,
      message: { err: 'inventoryController.updateInventory: ERROR: Check server logs for details' },
    });
  }
};

module.exports = inventoryController;