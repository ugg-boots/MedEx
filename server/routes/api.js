const express = require("express");
const router = express.Router();

//import controllers
const supplierController = require("../controllers/supplierController");
const catalogController = require("../controllers/catalogController");
const proceduresController = require("../controllers/proceduresController")
const inventoryController = require('../controllers/inventoryController');

// Routes for SUPPLIER TABLE
router.get("/suppliers", supplierController.getAllSuppliers, (req, res) =>
    res.status(200).json(res.locals.suppliers)
);
// router.get("/api/suppliers/:id", )
// router.post("/", )
// router.put("/",)
// router.delete("/",)

// Routes for CATALOG TABLE
router.get("/catalog", catalogController.getAllProducts, (req, res) =>
    res.status(200).json(res.locals.products)
);

// Routes for PROCEDURES TABLE
router.get("/procedures", proceduresController.getAllProcedures, (req, res) =>
    res.status(200).json(res.locals.procedures)
);

//***Routes for INVENTORY TABLE
router.get("/inventory", inventoryController.getAllInventory, (req, res) => res.status(200).json(res.locals.inventory));

router.get("/inventory/:id", inventoryController.getAllInventory, (req, res) => res.status(200).json(res.locals.inventory));

router.post('/inventory', inventoryController.addNewInventory, (req, res) => res.status(200).json(res.locals.newInventory))

router.delete("/inventory", inventoryController.deleteInventory, (req, res) => res.status(200).json(res.locals.deleteInventory))

// router.put("/inventory", inventoryController, (req, res) => res.status(200).json());


module.exports = router;