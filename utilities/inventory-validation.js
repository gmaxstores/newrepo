const invModel = require("../models/inventory-model")
const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}


//validation rules for classification addition
validate.addClassificationRules = () => {
    return [
        // classification_name is required and must not exist in the DB already
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isAlphanumeric()
            .withMessage("A classification name without spaces and special characters is required.")
            .custom(async (classification_name) => {
                const classificationExists = await invModel.checkExistingClassification(classification_name)
                if (classificationExists) {
                    throw new Error("Classification already exists.")
                }
            })
    ]
}


//check data from classification addition form using classification addition rules
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
}


//validation rules for inventory addition
validate.addInventoryRules = () => {
    return [
        // inv_make is required
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha('en-US', {ignore: ' -_'})
            .isLength({min: 1})
            .withMessage("An inventory make name without spaces and special characters is required."),
            

            //inv_model is required and must not exist in the DB already
            body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha('en-US', {ignore: ' -_'})
            .isLength({min: 1})
            .withMessage("An inventory model name without spaces and special characters is required."),

            // inv_year is required and must be a valid year contraing just 4 digits
            body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isInt({min: 1600, max: 2026})
            .withMessage("An inventory year within the allowed range is required"),

            // inv_description is required
            body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("An inventory description is required."),

            // inv_description is required
            body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("An inventory image path is required."),

            // inv_description is required
            body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("An inventory thumbnail is required."),

            // inv_price is required and must be an integer ranging from 0 - 999,999,999
            body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isInt({min: 1, max: 999999999})
            .withMessage("An inventory price within the specified range is required."),

            // inv_miles is required and must be an integer
            body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isInt()
            .withMessage("An inventory mileage is required and must be an integer."),

            // inv_color is required and must be a hex color
            body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha('en-US', {ignore: ' -_'})
            .isLength({min: 3, max: 20})
            .withMessage("An inventory color is required. Min length is 3 and maximum length is 20"),

            // classification_id is required and must be an integer ranging from 0 - 999,999,999
            body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("An inventory classification is required."),
    ]
}


//check data from inventory addition form using inventory addition rules
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let classificationList = await utilities.buildClassificationList()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        classificationList,
        inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id,
      })
      return
    }
    next()
}


//check data from inventory modification form using inventory addition rules and redirect to edit inventory view
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("inventory/edit-inventory", {
      errors,
      title: `Edit ${inv_make} ${inv_model}`,
      nav,
      classificationList,
      inv_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id,
    })
    return
  }
  next()
}





module.exports = validate
