const pool = require("../models/inventoryModel")

const catalogController = {};

// add middleware
catalogController.getAllProducts = async (req, res, next) => {
    const allProductsQuery = 
        `SELECT product_id, product_name, product_desc, suppliers.supplier_name, unit_price, qty_per_unit FROM catalog
        INNER JOIN suppliers ON catalog.supplier_id = suppliers.supplier_id`; 
    try {
        const products = await pool.query(allProductsQuery);
        res.locals.products = products.rows
        } catch (err) {
            next(err);
        }
      next();
};

catalogController.addNewProduct = async (req, res, next) => {
  try {
    const { product_name, product_desc, supplier_name, unit_price, qty_per_unit } = req.body;
    const newProduct = await pool.query(
      `INSERT INTO catalog (product_name, product_desc, supplier_id, unit_price, qty_per_unit) 
      VALUES ($1, $2, (SELECT supplier_id FROM suppliers WHERE supplier_name = $3), $4, $5)`, 
      [product_name, product_desc, supplier_name, unit_price, qty_per_unit]
    );
    res.locals.newProduct = newProduct;
  } catch(err) {
    console.log(err);
    next(err);
  }
  next();
};

catalogController.deleteProduct = async (req, res, next) => {
  try {
    console.log('req body for deleteProduct -->', req.body);
    const id  = req.body[0];
    const deletedProduct = await pool.query(
      `DELETE FROM catalog 
      WHERE product_id = $1`, 
      [id]
    );
    res.locals.deletedProduct = deletedProduct;
  } catch(err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports = catalogController;