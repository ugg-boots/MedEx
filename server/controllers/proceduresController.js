const pool = require("../models/inventoryModel")
const format = require('pg-format');

const proceduresController = {};

proceduresController.getAllProcedures = async (req, res, next) => {
    
  const allProceduresQuery = 
    `SELECT procedures.procedure_name, procedures.procedure_id, procedures.procedure_desc, catalog.product_name, junction.qty_per_procedure FROM procedures 
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

proceduresController.addProcedure = async (req, res, next) => {
  const { procedure_name, procedure_desc, materials } = req.body;
  const procedureParams = [procedure_name, procedure_desc];
  
  const addProcedureQuery = `INSERT INTO procedures (procedure_name, procedure_desc) 
  VALUES ($1, $2)
  RETURNING procedure_id`;

  try {
    const newProcedure = await pool.query(addProcedureQuery, procedureParams);
    res.locals.procedureID = newProcedure.rows[0].procedure_id;
  }

  catch(err) {
    next({
      log: 'proceduresController.addProcedure: ERROR:' + err.message,
      message: { err: 'proceduresController.addProcedure: ERROR: Check server logs for details' },
    });
  }

  const junctionParams = [];
  materials.forEach(product => {
    if (product.quantity && product.quantity > 0) junctionParams.push([res.locals.procedureID, product.productID, product.quantity]);
  })
  
  const addJunctionQuery = format(`INSERT INTO junction (procedure_id, product_id, qty_per_procedure) VALUES %L RETURNING 
    junction_id`, junctionParams);

  try {
    const newJunction = await pool.query(addJunctionQuery);
    res.locals.newJunctions = newJunction.rows;
  }

  catch(err) {
    next({
      log: 'proceduresController.addProcedure: ERROR:' + err.message,
      message: { err: 'proceduresController.addProcedure: ERROR: Check server logs for details' },
    });
  }

  const newProcedureParams = res.locals.newJunctions.map(row => row.junction_id);
  const newProcedureQuery = format(`SELECT procedures.procedure_name, procedures.procedure_id, procedures.procedure_desc, catalog.product_name, junction.qty_per_procedure FROM procedures 
  INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
  INNER JOIN catalog ON catalog.product_id = junction.product_id
  WHERE junction_id IN (%L)`, newProcedureParams)

  try {
    const newProcedure = await pool.query(newProcedureQuery);
    res.locals.newProcedure = newProcedure.rows;
  }

  catch(err) {
    next({
      log: 'proceduresController.addProcedure: ERROR:' + err.message,
      message: { err: 'proceduresController.addProcedure: ERROR: Check server logs for details' },
    });
  }

  next();
}

module.exports = proceduresController;