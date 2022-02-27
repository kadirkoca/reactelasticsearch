const express = require("express")
const router = new express.Router()
const MainController = require("../app/controllers/main.controller.js")

router.get("/getusers", MainController.indexusers)
router.post("/userworks", MainController.storeuser)

module.exports = router
