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

catalogController.addNewProduct = (req, res, next) => {
  try {
    const { product_id, product_name, product_desc, supplier_id} = req.body;
  } catch(err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports = catalogController;