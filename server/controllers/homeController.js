const pool = require("../models/inventoryModel");
const homeController = {};

homeController.getShoppingData = async (req, res, next) => {
  
  const user_id = req.params.userId;
  const shoppingDataQuery = `SELECT procedures.procedure_name, catalog.product_name, catalog.qty_per_unit, junction.qty_per_procedure, catalog.unit_price, suppliers.supplier_name FROM procedures 
    INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
    INNER JOIN catalog ON junction.product_id = catalog.product_id
    INNER JOIN suppliers ON suppliers.supplier_id = catalog.supplier_id
    WHERE procedures.user_id = $1`;
  
  try {
    const shoppingData = await pool.query(shoppingDataQuery, [user_id]);
    res.locals.shoppingData = shoppingData.rows;
    next();
  } 
  
  catch(err) {
    next({
      log: 'homeController.getShoppingData: ERROR:' + err.message,
      message: { err: 'homeController.getShoppingData: ERROR: Check server logs for details' },
    });
  }
};

homeController.getLowStockData = async (req, res, next) => {
  
  const user_id = req.params.userId;
  const lowStockQuery = `SELECT max_stock, product_name, inventory.quantity AS quantity FROM catalog 
    INNER JOIN inventory ON catalog.product_id = inventory.product_id
    WHERE catalog.user_id = $1`;

  try {
    const lowStockData = await pool.query(lowStockQuery, [user_id]);
    res.locals.lowStockData = lowStockData.rows;
    next();
  } 
  
  catch(err) {
    next({
      log: 'homeController.getLowStockData: ERROR:' + err.message,
      message: { err: 'homeController.getLowStockData: ERROR: Check server logs for details' },
    });
  }
 
};

homeController.getExpirationData = async (req, res, next) => {
  
  const user_id = req.params.userId;
  const expirationQuery = `SELECT item_id, catalog.product_name, quantity, expiration_date FROM inventory 
    INNER JOIN catalog ON inventory.product_id = catalog.product_id
    WHERE inventory.user_id = $1`;
  
  try {
    const expirationData = await pool.query(expirationQuery, [user_id]);
    res.locals.expirationData = expirationData.rows;
    next();
  } 
  
  catch (err) {
    next({
      log: 'homeController.getExpirationData: ERROR:' + err.message,
      message: { err: 'homeController.getExpirationData: ERROR: Check server logs for details' },
    });
  }
 
};

module.exports = homeController;