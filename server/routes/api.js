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
router.get("/suppliers", supplierController.getSupplierById, (req, res) => res.status(200).json(res.locals.getSupplierById.row));

router.post("/suppliers", supplierController.addNewSupplier, (req, res) => res.status(200).json(res.locals.newSupplier))

router.put("/suppliers", supplierController.updateSupplier, (req, res) => res.status(200).json(res.locals.updatedSupplier));

router.delete("/suppliers", supplierController.deleteSupplier, (req, res) =>
    res.status(200).json(res.locals.deletedSupplier)
);

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

router.get("/inventory/:id", inventoryController.getInventoryById, (req, res) => res.status(200).json(res.locals.inventoryById.row));

router.post('/inventory', inventoryController.addNewInventory, (req, res) => res.status(200).json(res.locals.newInventory))

router.delete("/inventory", inventoryController.deleteInventory, (req, res) => res.status(200).json(res.locals.deletedInventory))

router.put("/inventory/:id", inventoryController.updateInventory, (req, res) => res.status(200).json("res.locals.updatedInventory"));


module.exports = router;