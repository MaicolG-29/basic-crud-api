const express = require("express");
const router = express.Router();

const toppingRoutes = require("./topping.routes");
const drinkRoutes = require("./drink.routes");
const baseRoutes = require("./base.routes");
const proteinRoutes = require("./protein.routes");
const waiterRoutes = require("./waiter.routes");
const statusRoutes = require("./status.routes");

router.use("/toppings", toppingRoutes);
router.use("/drinks", drinkRoutes);
router.use("/bases", baseRoutes);
router.use("/proteins", proteinRoutes);
router.use("/waiters", waiterRoutes);
router.use("/statuses", statusRoutes);

module.exports = router;
