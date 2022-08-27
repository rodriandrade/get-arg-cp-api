const express = require("express")
const router = express.Router()
const postalCode = require("../controllers/validatePostalCode.js")

router.get("/", postalCode.validate)

module.exports = router