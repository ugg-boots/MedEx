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

module.exports = catalogController;

// For api.js file...
//router.get("/catalog", catalogController.getAllProducts, (req, res) =>
//    res.status(200).json(res.locals.products)
//);