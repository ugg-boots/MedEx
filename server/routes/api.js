const express = require("express");

const supplierController = require("../controllers/supplierController");

const router = express.Router();

router.get("/suppliers", supplierController.getAllSuppliers, (req, res) =>
    res.status(200).json(res.locals.suppliers)
);

// router.get("/api/suppliers/:id", )

// router.post("/",  

// )

// router.put("/", 

// )

// router.delete("/", 

// )

module.exports = router;