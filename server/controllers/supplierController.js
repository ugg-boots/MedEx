const pool = require("../models/inventoryModel")

const supplierController = {};

supplierController.getAllSuppliers = async (req, res, next) => {
  
  const user_id = req.params.userId;
  const supplierQuery = 'SELECT * FROM suppliers WHERE user_id = $1';
  
  try {
    const suppliers = await pool.query(supplierQuery, [user_id]);
    res.locals.suppliers = suppliers.rows;
    next();
  } 
  
  catch (err) {
    next({
      log: 'supplierController.getAllSuppliers: ERROR:' + err.message,
      message: { err: 'supplierController.getAllSuppliers: ERROR: Check server logs for details' },
    });
  }
};

supplierController.addNewSupplier = async (req, res, next) => {
  
  const { supplier_name, key_contact, supplier_phone_number, supplier_address, user_id } = req.body;
  const params = [supplier_name, key_contact, supplier_phone_number, supplier_address, user_id];
  const newSupplierQuery = `INSERT INTO suppliers (supplier_name, key_contact, supplier_phone_number, supplier_address, user_id) 
    VALUES($1, $2, $3, $4, $5) RETURNING *`;
  
  try {
    const newSupplier = await pool.query(newSupplierQuery, params);
    res.locals.newSupplier = newSupplier;
    next();
  } 
  
  catch(err) {
    next({
      log: 'supplierController.addNewSupplier: ERROR:' + err.message,
      message: { err: 'supplierController.addNewSupplier: ERROR: Check server logs for details' },
    });
  }
};

module.exports = supplierController;