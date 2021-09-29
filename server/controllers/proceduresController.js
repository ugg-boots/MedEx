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

module.exports = proceduresController;

// For api.js file...
//router.get("/procedures", procedureController.getAllProcedures, (req, res) =>
//    res.status(200).json(res.locals.procedures)
//);