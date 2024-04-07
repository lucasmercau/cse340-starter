// Needed Resources 
const regValidate = require("../utilities/account-validation")
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData, 
    utilities.handleErrors(accountController.accountLogin))

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Register account from register page
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData, 
    utilities.handleErrors(accountController.registerAccount))
// Management route
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Route to build update account view
router.get("/update", utilities.handleErrors(accountController.buildUpdateAccount))
// Update account from register page
router.post(
    "/update",
    regValidate.updateAccountRules(),
    regValidate.checkUpdAccData, 
    utilities.handleErrors(accountController.updateAccount))
// Update account from register page
router.post(
    "/updatepassword",
    regValidate.updatePasswordRules(),
    regValidate.checkUpdAccData, 
    utilities.handleErrors(accountController.updatePassword))

//Logout Account
router.get("/logout", accountController.logoutAccount)

router.post(
    "/updatetype",
    utilities.adminType,
    regValidate.updateTypeRules(),
    regValidate.checkUpdateTypeData,
    utilities.handleErrors(accountController.updateType))

//Update Account Type only Admin
router.get(
    "/accounttype",
    utilities.adminType, 
    utilities.handleErrors(accountController.buildAccountType))

router.use(utilities.checkJWTToken)

module.exports = router