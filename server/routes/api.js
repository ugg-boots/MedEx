const express = require('express');
const router = express.Router();

// import controllers
const homeController = require('../controllers/homeController');
const inventoryController = require('../controllers/inventoryController');
const proceduresController = require('../controllers/proceduresController')
const catalogController = require('../controllers/catalogController');
const supplierController = require('../controllers/supplierController');

// routes for HOME display
router.get('/shop',
    homeController.getShoppingData,
    (req, res) => res.status(200).json(res.locals.shoppingData)
);

router.get('/lowStock', 
    homeController.getLowStockData, 
    (req, res) => res.status(200).json(res.locals.lowStockData)
);

router.get('/expiration', 
    homeController.getExpirationData, 
    (req, res) => res.status(200).json(res.locals.expirationData)
);

// routes for INVENTORY TABLE
router.get('/inventory', 
    inventoryController.getAllInventory, 
    (req, res) => res.status(200).json(res.locals.inventory)
);

router.post('/inventory', 
    inventoryController.addNewInventory, 
    (req, res) => res.status(200).json(res.locals.newInventory)
);

router.delete('/inventory', 
    inventoryController.deleteInventory, 
    (req, res) => res.status(200).json(res.locals.deletedInventory)
);

// routes for PROCEDURES TABLE
router.get('/procedures', 
    proceduresController.getAllProcedures, 
    (req, res) => res.status(200).json(res.locals.procedures)
);

router.post('/procedures', 
    proceduresController.addProcedure,
    (req, res) => res.status(200).json(res.locals.newProcedure)
);

router.delete('/procedures',
    proceduresController.deleteProcedure,
    (req, res) => res.status(200).json(res.locals.deletedJunctions)
);

// routes for CATALOG TABLE
router.get('/catalog', 
    catalogController.getAllProducts, 
    (req, res) => res.status(200).json(res.locals.products)
);

router.post('/catalog', 
    catalogController.addNewProduct, 
    (req, res) => res.status(200).json(res.locals.newProduct)
);

// routes for SUPPLIER TABLE
router.get('/suppliers', 
    supplierController.getAllSuppliers, 
    (req, res) => res.status(200).json(res.locals.suppliers)
);

router.post('/suppliers', 
    supplierController.addNewSupplier, 
    (req, res) => res.status(200).json(res.locals.newSupplier)
);

module.exports = router;