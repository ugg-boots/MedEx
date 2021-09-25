const express = require("express");
const suppliersController = require("../controllers/suppliersController");

const router = express.Router();

router.get("/api/suppliers", suppliersController.getAllSuppliers, (req, res) =>
res.status(200).json(res.locals.suppliers)
)

router.get()

router.post("/",  

)

router.put("/", 

)

router.delete("/", 

)

module.exports = router;