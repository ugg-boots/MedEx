const pool = require("../models/inventoryModel")
const format = require('pg-format');

const proceduresController = {};

proceduresController.getAllProcedures = async (req, res, next) => {
    
  const user_id = req.params.userId;
  const allProceduresQuery = 
    `SELECT procedures.procedure_name, procedures.procedure_id, procedures.procedure_desc, catalog.product_name, junction.qty_per_procedure FROM procedures 
    INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
    INNER JOIN catalog ON catalog.product_id = junction.product_id
    WHERE procedures.user_id = $1`; 

  try {
    const procedures = await pool.query(allProceduresQuery, [user_id]);
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
  const { procedure_name, procedure_desc, materials, user_id } = req.body;
  const procedureParams = [procedure_name, procedure_desc, user_id];
  
  const addProcedureQuery = `INSERT INTO procedures (procedure_name, procedure_desc, user_id) 
  VALUES ($1, $2, $3)
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
    if (product.quantity && product.quantity > 0) junctionParams.push([res.locals.procedureID, product.productID, product.quantity, user_id]);
  })
  
  const addJunctionQuery = format(`WITH inserted AS (INSERT INTO junction (procedure_id, product_id, qty_per_procedure, user_id) VALUES %L RETURNING 
  *) SELECT procedures.procedure_name, procedures.procedure_id, procedures.procedure_desc, catalog.product_name, inserted.qty_per_procedure FROM inserted 
  INNER JOIN procedures ON procedures.procedure_id = inserted.procedure_id
  INNER JOIN catalog ON catalog.product_id = inserted.product_id`, junctionParams);

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

  next();
}

proceduresController.deleteProcedure = async (req, res, next) => {
  const {procedure_id} = req.params; 
  const param = [procedure_id];
  const deleteProcedureQuery = `DELETE FROM procedures WHERE procedure_id = $1`;
  
  try { 
    const deletedProcedure = await pool.query(deleteProcedureQuery, param);
    res.locals.deletedProcedure = deletedProcedure;
  } 
  catch(err) {
    next({
      log: 'proceduresController.deleteProcedure: ERROR:' + err.message,
      message: { err: 'proceduresController.deleteProcedure: ERROR: Check server logs for details' },
    });
  }

  const deleteJunctionsQuery = `DELETE FROM junction WHERE procedure_id = $1 `;
  
  try { 
    const deletedJunctions = await pool.query(deleteJunctionsQuery, param);
    res.locals.deletedJunctions = {procedure_id: procedure_id};
    next();
  } 
  catch(err) {
    next({
      log: 'proceduresController.deleteProcedure from junction : ERROR:' + err.message,
      message: { err: 'proceduresController.deleteProcedure from junction: ERROR: Check server logs for details' },
    });
  }
}

module.exports = proceduresController;