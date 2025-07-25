const express = require("express");
const router = express.Router();
const toppingController = require("../controllers/topping.controller");

router.get("/", toppingController.getAllToppings);
router.post("/", toppingController.postTopping);
router.get("/:id", toppingController.getToppingById);
router.put("/:id", toppingController.updateToppingById)
router.delete("/:id", toppingController.deleteToppingById)

module.exports = router;
