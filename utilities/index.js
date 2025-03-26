const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

//Build the vehicle detail view html
Util.buildVehicleDetailByInvId = async function (data) {
    let vehicleDetail
    if (data.length > 0) {
        vehicleDetail = '<div id="vehicle-details-gridbox">'
        vehicleDetail += '<div id="vehicle-img-box">'
        vehicleDetail += '<p>This vehicle has passed inspection<br>by an ASE-certified technician</p>'
        vehicleDetail += `<img src="${data[0].inv_image}" alt="Image of ${data[0].inv_make} ${data[0].inv_model} on CSE Motors" title="Image of ${data[0].inv_make} ${data[0].inv_model} on CSE Motors">`
        vehicleDetail += `<h2>${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}</h2>`
        vehicleDetail += `<p>${data[0].inv_description}</p>`
        vehicleDetail += '</div>'
        vehicleDetail += '<div id="vehicle-details-box">'
        vehicleDetail += `<h1>${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}</h1>`
        vehicleDetail += '<section class="top-section">'
        vehicleDetail += `<p class="mileage-p"><span class="mileage">MILEAGE</span><br><span class="mileage-value">${new Intl.NumberFormat('en-US').format(data[0].inv_miles)}</span></p>`
        vehicleDetail += '<p class="haggle-p">No-Haggle Price<span class="superscript">¹</span></p>'
        vehicleDetail += `<p class="price-tag">$${new Intl.NumberFormat('en-US').format(data[0].inv_price)}</p>`
        vehicleDetail += '<p class="vat">VAT exclusive</p>'
        vehicleDetail += '</section>'
        vehicleDetail += '<section class="middle-section">'
        vehicleDetail += '<aside class="details">'
        vehicleDetail += `<p><span class="detail-span">Mileage:</span> ${new Intl.NumberFormat('en-US').format(data[0].inv_miles)}</p>`
        vehicleDetail += `<p><span class="detail-span">MAKE:</span> ${data[0].inv_make}</p>`
        vehicleDetail += `<p><span class="detail-span">MODEL:</span> ${data[0].inv_model}</p>`
        vehicleDetail += `<p><span class="detail-span">YEAR:</span> ${data[0].inv_year}</p>`
        vehicleDetail += `<p><span class="detail-span">COLOR:</span> ${data[0].inv_color}</p>`
        vehicleDetail += '</aside>'
        vehicleDetail += '<aside class="detail-buttons">'
        vehicleDetail += '<button class="start-button">START MY PURCHASE</button>'
        vehicleDetail += '<button class="detail-button">CONTACT US</button>'
        vehicleDetail += '<button class="detail-button">🚗SCHEDULE TEST DRIVE</button>'
        vehicleDetail += '<button class="detail-button">APPLY FOR FINANCING</button>'
        vehicleDetail += '</aside>'
        vehicleDetail += '</section>'
        vehicleDetail += '<section class="bottom-section">'
        vehicleDetail += '<p>If you would like to insure this vehicle before purchase, kindly give us a call.</p>'
        vehicleDetail += '<p>Call Us<br><span class="contact-number">+234 509 466 3455</span></p>'
        vehicleDetail += '</section>'
        vehicleDetail += '</div>'
        vehicleDetail += '</div>'
    } else {
        vehicleDetail += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
    }
    return vehicleDetail
}


//get the classification list using the classification table
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util