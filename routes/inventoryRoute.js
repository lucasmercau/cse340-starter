// Needed Resources 
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

module.exports = router;