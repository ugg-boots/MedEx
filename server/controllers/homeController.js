const pool = require("../models/inventoryModel");
const homeController = {};

homeController.viewProcedureDetails = async (req, res, next) => {
  const { procedure_name } = req.body;
  const procedureDetailsQuery = `SELECT catalog.product_name, catalog.qty_per_unit, junction.qty_per_procedure
    FROM procedures
    INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
    INNER JOIN catalog ON junction.product_id = catalog.product_id
    WHERE procedures.procedure_name = $1`, [ procedure_name];
  try {
    const procedureDetails = await pool.query(procedureDetailsQuery);
    res.locals.procedureDetails = procedureDetails.rows;
  } catch(err) {
    next(err);
  }
  next();
};

module.exports = homeController;