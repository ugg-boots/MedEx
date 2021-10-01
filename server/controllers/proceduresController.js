const pool = require("../models/inventoryModel")

const proceduresController = {};

// add middleware
proceduresController.getAllProcedures = async (req, res, next) => {
    const allProceduresQuery = 
        `SELECT procedures.procedure_name, procedures.procedure_desc, catalog.product_name, junction.quantity FROM procedures 
        INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
        INNER JOIN catalog ON catalog.product_id = junction.product_id`; 
    try {
        const procedures = await pool.query(allProceduresQuery);
        res.locals.procedures = procedures.rows;
        } catch (err) {
            next(err);
        }
      next();
};

proceduresController.addNewProcedure = async (req, res, next) => {
    try {
      const { procedure_id, procedure_name, procedure_desc } = req.body;
      const newProcedure = await pool.query(
        `INSERT INTO procedures (procedure_id, procedure_name, procedure_desc)
        VALUES ($1, $2, $3)`, [procedure_id, procedure_name, procedure_desc]
      );
      res.locals.newProcedure = newProcedure;
    } catch(err) {
      next(err);
    }
    next();
};

// refactor this...
proceduresController.deleteProcedure = async (req, res, next) => {
  try {
    console.log('req body for deleteProcedure -->', req.body);
    const id  = req.body[0];
    const deletedProcedure = await pool.query(
      `DELETE FROM procedure 
      WHERE procedure_id = $1`, 
      [id]
    );
    res.locals.deletedProcedure = deletedProcedure;
  } catch(err) {
    next(err);
  }
  next();
}

module.exports = proceduresController;