const pool = require("../models/inventoryModel")

const catalogController = {};

catalogController.getAllProducts = async (req, res, next) => {
  
  const user_id = req.params.userId;
  const allProductsQuery = 
        `SELECT product_id, product_name, product_desc, suppliers.supplier_name, unit_price, qty_per_unit, max_stock FROM catalog
        INNER JOIN suppliers ON catalog.supplier_id = suppliers.supplier_id WHERE catalog.user_id = $1`; 
    try {
        const products = await pool.query(allProductsQuery, [user_id]);
        res.locals.products = products.rows
    }

    catch(err) {
        next({
          log: 'catalogController.addNewProduct: ERROR:' + err.message,
          message: { err: 'catalogController.addNewProduct: ERROR: Check server logs for details' },
        });
    }
    
    next();
};

catalogController.addNewProduct = async (req, res, next) => {
  const { product_name, product_desc, supplier_name, unit_price, qty_per_unit, max_stock, user_id } = req.body;
  const insertQuery = `WITH inserted AS (
      INSERT INTO catalog (product_name, product_desc, supplier_id, unit_price, qty_per_unit, max_stock, user_id) 
      VALUES ($1, $2, (SELECT supplier_id FROM suppliers WHERE supplier_name = $3 AND user_id = $7), $4, $5, $6, $7)
      RETURNING *)
      SELECT inserted.*, suppliers.supplier_name
      FROM inserted
      INNER JOIN suppliers ON inserted.supplier_id = suppliers.supplier_id`;
  const params = [product_name, product_desc, supplier_name, unit_price, qty_per_unit, max_stock, user_id]

  try {
    const newProduct = await pool.query(insertQuery, params);
    res.locals.newProduct = newProduct;
  } 
  
  catch(err) {
    next({
      log: 'catalogController.addNewProduct: ERROR:' + err.message,
      message: { err: 'catalogController.addNewProduct: ERROR: Check server logs for details' },
    });
  }

  next();
};

module.exports = catalogController;