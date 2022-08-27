const express = require("express")
const router = express.Router()
const postalCode = require("../controllers/postalCode.js")

router.get("/", postalCode.getPostalCode)

module.exports = router