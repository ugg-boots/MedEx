const express = require("express");
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');

const pool = require("../models/inventoryModel")

const supplierController = {};

// add middleware
supplierController.getAllSuppliers = async (req, res, next) => {
      try {
        console.log("Supplier Controller....")
        const suppliers = await pool.query("SELECT * FROM suppliers");
        console.log(suppliers);
        res.locals.suppliers = suppliers.rows
        } catch (err) {
            next(err);
        }
      next();
};

// supplierController.getSupplierById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const supplierById = await pool.query("SELECT * FROM suppliers WHERE supplier_id = $1",
//     [id]
//     );
//     res.json(supplierById.row);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// app.post("/api/suppliers", async(req, res) => {
//     try {
//           const { supplier_name, key_contact, supplier_phone_number, supplier_address } = req.body;
//       const newSupplier = await pool.query("INSERT INTO {supplier_info} VALUE($1) RETURNING *",
//       [ supplier_name, key_contact, supplier_phone_number, supplier_address ]
//       );
//       res.json(newSupplier);
//     } catch(err) {
//       console.error(message);
//     }
//   });
  
//   app.put("/api/suppliers/:id", async(req, res) => {
//     try {
//       const { id } = req.params;
      
//       const { supplier_name, key_contact, supplier_phone_number, supplier_address } = req.body;
  
//       const updateSupplier = await pool.query("UPDATE suppliers SET  key_contact = $1 WHERE supplier_id = $2",
//       [ key_contact, id ]
//       );
//       res.json("Supplier updated...")
//     } catch(err) {
//       console.error(err.message)
//     }
//   });
  
  
  

module.exports = supplierController;