// Needed Resources 
const regValidate = require("../utilities/account-validation")
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

//Route to build vehicle details
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail))
  
//Route of Error
router.get("/error", utilities.handleErrors(invController.errorRoute))

//Route Vehicle Management
router.get("/", utilities.accountType, utilities.handleErrors(invController.buildInventoryManagement))

//Route Vehicle Management Classification
router.get("/classification", utilities.accountType, utilities.handleErrors(invController.buildAddClassification))
//Add New Classification
router.post(
    "/classification",
    utilities.accountType,
    regValidate.classificationRules(),
    regValidate.checkClassificationData, 
    utilities.handleErrors(invController.addClassification))

//Route Vehicle Management to add Vehicle
router.get("/vehicle", utilities.handleErrors(invController.buildAddVehicle))
//Add New Vehicle
router.post(
    "/vehicle",
    utilities.accountType,
    regValidate.vehicleRules(),
    regValidate.checkVehicleData, 
    utilities.handleErrors(invController.addVehicle))

// Get Inventory in Manage Inventory at ../inv/
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Edit inventory view
router.get("/edit/:inv_id", utilities.accountType, utilities.handleErrors(invController.buildEdit))
// Update inventory
router.post(
    "/update/",
    utilities.accountType,
    regValidate.updateRules(),
    regValidate.checkUpdateData,
     utilities.handleErrors(invController.updateInventory))

// Delete inventory Route
router.get("/delete/:inv_id", utilities.accountType, utilities.handleErrors(invController.buildDeleteView))
// Delete inventory
router.post(
    "/delete",
    utilities.accountType,
    utilities.handleErrors(invController.deleteInventory))


module.exports = router;