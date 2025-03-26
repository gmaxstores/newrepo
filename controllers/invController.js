const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

//Build vehicle detail view by vehicle id
invCont.buildVehicleDetailByVehicleId = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getVehicleDetailsByInvId(inv_id)
    const vehicleDetail = await utilities.buildVehicleDetailByInvId(data)
    let nav = await utilities.getNav()
    const className = `${data[0].inv_make} ${data[0].inv_model}`
    res.render("./inventory/vehicle", {
        title: `${className} Vehicle`,
        nav,
        vehicleDetail,
        errors: null
    })
}

//intentional error
invCont.error = async function (req, res, next) {
    //throw new Error("500-type error")
    next({status: 500, message: "500-type error"})
}


//management view
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

//classification addition form view
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}


//process addition of classification
invCont.addClassification = async function (req, res) {
  const { classification_name} = req.body
  const addResult = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav()
  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you've added the ${classification_name} classification.`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the classification addition failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      classification_name,
    })
  }
}



//inventory addition form view
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
  })
}


//process addition of inventory
invCont.addInventory = async function (req, res) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  const addResult = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(classification_id)
  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you've added ${inv_year} ${inv_make} ${inv_model} as an inventory.`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the inventory addition failed.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
      inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id,
    })
  }
}





module.exports = invCont