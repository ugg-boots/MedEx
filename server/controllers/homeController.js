const pool = require("../models/inventoryModel");
const homeController = {};

homeController.viewProcedureDetails = async (req, res, next) => {
  const procedureDetailsQuery = `SELECT procedures.procedure_name, catalog.product_name, catalog.qty_per_unit, junction.qty_per_procedure, catalog.unit_price, suppliers.supplier_name
  FROM procedures
  INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
  INNER JOIN catalog ON junction.product_id = catalog.product_id
  INNER JOIN suppliers ON suppliers.supplier_id = catalog.supplier_id`;
  try {
    const procedureDetails = await pool.query(procedureDetailsQuery);
    res.locals.procedureDetails = procedureDetails.rows;
  } catch(err) {
    next(err);
  }
  next();
};

module.exports = homeController;