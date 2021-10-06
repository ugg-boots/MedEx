const pool = require("../models/inventoryModel")

const catalogController = {};

// add middleware
catalogController.getAllProducts = async (req, res, next) => {
    
  const allProductsQuery = 
    `SELECT product_id, product_name, product_desc, suppliers.supplier_name, unit_price, qty_per_unit FROM catalog
    INNER JOIN suppliers ON catalog.supplier_id = suppliers.supplier_id`; 
  
  try {
    const products = await pool.query(allProductsQuery);
    res.locals.products = products.rows;
    next();
  } 
    
  catch (err) {
    next({
      log: 'catalogController.getAllProducts: ERROR:' + err.message,
      message: { err: 'catalogController.getAllProducts: ERROR: Check server logs for details' },
    });
  }
};

catalogController.addNewProduct = async (req, res, next) => {

  const { product_name, product_desc, supplier_name, unit_price, qty_per_unit, max_stock } = req.body;
  const params = [product_name, product_desc, supplier_name, unit_price, qty_per_unit, max_stock];
  const newProductQuery = `INSERT INTO catalog (product_name, product_desc, supplier_id, unit_price, qty_per_unit, max_stock) 
  VALUES ($1, $2, (SELECT supplier_id FROM suppliers WHERE supplier_name = $3), $4, $5, $6)`

  try {
    const newProduct = await pool.query(newProductQuery, params);
    res.locals.newProduct = newProduct;
    next();
  } 
  
  catch(err) {
    next({
      log: 'catalogController.addNewProduct: ERROR:' + err.message,
      message: { err: 'catalogController.addNewProduct: ERROR: Check server logs for details' },
    });
  }
};

module.exports = catalogController;