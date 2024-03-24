const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  console.log(data)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/******************************
 * Assignment 3 - Vehicle Detail View
 * Build view of vehicle detail 
 * *************************/
invCont.buildVehicleDetail = async function (req, res, next) {
  const inv_id = await req.params.invId;
  const data = await invModel.getInventoryDetailById(inv_id)
  const details = await utilities.buildVehicleDetail(data)
  let nav = await utilities.getNav()
  const vehicleYear = data[0].inv_year
  const vehicleMake = data[0].inv_make
  const vehicleModel = data[0].inv_model
  res.render("./inventory/details", {
    title: `${vehicleYear} ${vehicleMake} ${vehicleModel} Details`,
    nav,
    details,
  })
}

/******************************
 * Assignment 4 - Vehicle Management View 
 * *************************/
invCont.buildInventoryManagement = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/******************************
 * Assignment 4 - Add Classification View 
 * *************************/
invCont.buildAddClassification = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/addclassification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/******************************
 * Assignment 4 - Add Vehicle View 
 * *************************/
invCont.buildAddVehicle = async function(req, res, next) {
  let nav = await utilities.getNav()
  const { classification_id } = req.body
  let list = await utilities.buildClassificationList(classification_id)
  res.render("./inventory/addvehicle", {
    title: "Add New Vehicle",
    nav,
    errors: null,
    list,
  })
}

/* ****************************************
*  Add New Classification
* *************************************** */
invCont.addClassification = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  if (regResult) {
    nav = await utilities.getNav()
    req.flash("notice", `The ${classification_name} was succesfully added.`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Provide a correct classification name.")
    res.status(501).render("inventory/addclassification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Add New Classification
* *************************************** */
invCont.addVehicle = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const regResult = await invModel.addVehicle(
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
  )

  if (regResult) {
    nav = await utilities.getNav()
    req.flash("notice", `The ${inv_make} ${inv_model} was succesfully added.`)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    const { classification_id } = req.body
    let list = await utilities.buildClassificationList(classification_id)
    res.status(501).render("inventory/addvehicle", {
      title: "Add New Vehicle",
      nav,
      errors: null,
      list,
    })
  }
}

module.exports = invCont