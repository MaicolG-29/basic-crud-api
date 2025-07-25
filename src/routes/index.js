const express = require("express");
const router = express.Router();

const toppingRoutes = require("./topping.routes");
const drinkRoutes = require("./drink.routes");

router.use("/toppings", toppingRoutes);
router.use("/drinks", drinkRoutes);

module.exports = router;
