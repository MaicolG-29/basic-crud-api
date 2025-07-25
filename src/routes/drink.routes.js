const express = require("express");
const router = express.Router();
const drinkController = require("../controllers/drink.controller");

router.get("/", drinkController.getAllDrinks);
router.get("/:id", drinkController.getDrinkById);
router.post("/", drinkController.postDrink);
router.put("/:id", drinkController.updateDrinkById);
router.delete("/:id", drinkController.deleteDrinkById);

module.exports = router;
