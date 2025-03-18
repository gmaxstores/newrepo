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
    })
}

//intentional error
invCont.error = async function (req, res, next) {
    //throw new Error("500-type error")
    next({status: 500, message: "500-type error"})
}


module.exports = invCont