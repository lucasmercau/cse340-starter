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
router.get("/", utilities.handleErrors(invController.buildInventoryManagement))

//Route Vehicle Management Classification
router.get("/classification", utilities.handleErrors(invController.buildAddClassification))
//Add New Classification
router.post(
    "/classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData, 
    utilities.handleErrors(invController.addClassification))

//Route Vehicle Management to add Vehicle
router.get("/vehicle", utilities.handleErrors(invController.buildAddVehicle))
//Add New Classification
router.post(
    "/vehicle",
    regValidate.vehicleRules(),
    regValidate.checkVehicleData, 
    utilities.handleErrors(invController.addVehicle))

module.exports = router;