const express = require('express');
const router = express.Router();

// import controllers
const homeController = require('../controllers/homeController');
const inventoryController = require('../controllers/inventoryController');
const proceduresController = require('../controllers/proceduresController')
const catalogController = require('../controllers/catalogController');
const supplierController = require('../controllers/supplierController');
const authController = require('../controllers/authController');

// routes for HOME display
router.get('/shop/:userId',
    homeController.getShoppingData,
    (req, res) => res.status(200).json(res.locals.shoppingData)
);

router.get('/lowStock/:userId', 
    homeController.getLowStockData, 
    (req, res) => res.status(200).json(res.locals.lowStockData)
);

router.get('/expiration/:userId', 
    homeController.getExpirationData, 
    (req, res) => res.status(200).json(res.locals.expirationData)
);

// routes for INVENTORY TABLE
router.get('/inventory/:userId', 
    inventoryController.getAllInventory, 
    (req, res) => res.status(200).json(res.locals.inventory)
);

router.post('/inventory', 
    inventoryController.addNewInventory, 
    (req, res) => res.status(200).json(res.locals.newInventory)
);

router.delete('/inventory/:item_id', 
    inventoryController.deleteInventory, 
    (req, res) => res.status(200).json(res.locals.deletedInventory)
);

router.patch('/inventory', 
    inventoryController.updateInventory, 
    (req, res) => res.status(200).json(res.locals.updatedInventory)
);


// routes for PROCEDURES TABLE
router.get('/procedures/:userId', 
    proceduresController.getAllProcedures, 
    (req, res) => res.status(200).json(res.locals.procedures)
);

router.post('/procedures', 
    proceduresController.addProcedure,
    (req, res) => res.status(200).json(res.locals.newJunctions)
);

router.delete('/procedures/:procedure_id',
    proceduresController.deleteProcedure,
    (req, res) => res.status(200).json(res.locals.deletedJunctions)
);

// routes for CATALOG TABLE
router.get('/catalog/:userId', 
    catalogController.getAllProducts, 
    (req, res) => res.status(200).json(res.locals.products)
);

router.post('/catalog', 
    catalogController.addNewProduct, 
    (req, res) => res.status(200).json(res.locals.newProduct)
);

// routes for SUPPLIER TABLE
router.get('/suppliers/:userId', 
    supplierController.getAllSuppliers, 
    (req, res) => res.status(200).json(res.locals.suppliers)
);

router.post('/suppliers', 
    supplierController.addNewSupplier, 
    (req, res) => res.status(200).json(res.locals.newSupplier)
);

//routes for AUTH
router.post('/login', 
    authController.login,
    (req, res) => {res.status(200).json(res.locals.verifiedUser)
});
  
router.post('/register', 
    authController.register,
    (req, res) => {res.status(200).json(res.locals.registerMessage)
});

module.exports = router;