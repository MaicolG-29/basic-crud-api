const express = require("express");
const router = express.Router();
const toppingController = require("../controllers/topping.controller");

// GET /api/toppings
router.get("/", toppingController.getAllToppings);
router.post("/", toppingController.postTopping);

module.exports = router;
