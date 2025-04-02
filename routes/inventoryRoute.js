// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build vehicle details view
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetailByVehicleId));

//Route to intentional error
router.get("/error", utilities.handleErrors(invController.error));

//Route to management view
router.get("/inv/", utilities.handleErrors(invController.buildManagement));

//Route to build classification form view
router.get("/add-classification/", utilities.handleErrors(invController.buildAddClassification))

//Route to handle add classification form
router.post("/add-classification/",
    invValidate.addClassificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification));


//Route to build inventory form view
router.get("/add-inventory/", utilities.handleErrors(invController.buildAddInventory))


//Route to handle add inventory form
router.post("/add-inventory/",
    invValidate.addInventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory));




//route to build classification update table
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


//route to build edit inventory view
router.get("/edit/:invId", utilities.handleErrors(invController.buildEditInventory))

//route to process inventory update
router.post("/update", invValidate.addInventoryRules(), invValidate.checkUpdateData, utilities.handleErrors(invController.updateInventory))


//route to build delete inventory view
router.get("/delete/:invId", utilities.handleErrors(invController.buildDeleteInventory))


//route to process deletion of inventory
router.post("/delete", utilities.handleErrors(invController.deleteInventory))

module.exports = router;