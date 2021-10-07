const pool = require("../models/inventoryModel")

const proceduresController = {};

proceduresController.getAllProcedures = async (req, res, next) => {
    
  const allProceduresQuery = 
    `SELECT procedures.procedure_name, procedures.procedure_desc, catalog.product_name, junction.qty_per_procedure FROM procedures 
    INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
    INNER JOIN catalog ON catalog.product_id = junction.product_id`; 

  try {
    const procedures = await pool.query(allProceduresQuery);
    res.locals.procedures = procedures.rows;
    next();
  } 
  
  catch(err) {
    next({
      log: 'proceduresController.getAllProcedures: ERROR:' + err.message,
      message: { err: 'proceduresController.getAllProcedures: ERROR: Check server logs for details' },
    });
  }
};

module.exports = proceduresController;