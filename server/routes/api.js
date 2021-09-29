const express = require("express");

const supplierController = require("../controllers/supplierController");
const catalogController = require("../controllers/catalogController");
const proceduresController = require("../controllers/proceduresController")

const router = express.Router();

router.get("/suppliers", supplierController.getAllSuppliers, (req, res) =>
    res.status(200).json(res.locals.suppliers)
);

router.get("/catalog", catalogController.getAllProducts, (req, res) =>
    res.status(200).json(res.locals.products)
);

router.get("/procedures", proceduresController.getAllProcedures, (req, res) =>
    res.status(200).json(res.locals.procedures)
);

// router.get("/api/suppliers/:id", )

// router.post("/",  

// )

// router.put("/", 

// )

// router.delete("/", 

// )

module.exports = router;