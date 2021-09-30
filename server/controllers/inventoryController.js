const pool = require("../models/inventoryModel")

const inventoryController = {};

inventoryController.getAllInventory = async (req, res, next) => {
  try {
    const inventory = await pool.query('SELECT item_id, catalog.product_name, quantity, expiration_date FROM inventory INNER JOIN catalog ON inventory.product_id = catalog.product_id');
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
     res.locals.newInventory = newInventory;
    } catch (err) {
    console.log(err)
    next(err)
  }
  next();
};

inventoryController.updateInventory = async (req, res, next) => {
  try {
    console.log(req.params)
    const { id } = req.params
    const { quantity, expiration_date, product_name } = req.body;

    const updatedInventory = await pool.query('UPDATE inventory SET quantity = $1, expiration_date = $2, (SET inventory.product_name = $3 FROM catalog WHERE inventory.product_id = catalog.product_id) WHERE item_id = $4',
    [quantity, expiration_date, product_name, id]);
    //no product_name in inventory table
    //ALTER TABLE inventory ADD COLUMN product_name varchar(255);
    res.locals.updatedInventory = updatedInventory;
    
  } catch(err) {
    console.error(err.message)
    next(err);
  }
  next();
};

inventoryController.deleteInventory = async (req, res, next) => {
      try {
        // console.log(req.body);
        const id = req.body[0];
        const deletedInventory = await pool.query("DELETE FROM inventory WHERE item_id = $1", [id]);
        res.locals.deletedInventory = deletedInventory;
      } catch(err) {
        console.log(err)
        next(err)
      }
      next();
    };

// // STRETCH: handle multiple rows from req.body (array of objects) to be deleted


module.exports = inventoryController;