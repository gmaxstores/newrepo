const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


//route for my account/login
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//route for registration
router.get("/register", utilities.handleErrors(accountController.buildRegister))


//route to add data to db account table
router.post("/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))


//process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    (req, res) => {
        res.status(200).send('login process')
    }
)


module.exports = router;