const express = require("express");
const router = express.Router();

const toppingRoutes = require("./topping.routes");

router.use("/toppings", toppingRoutes);

module.exports = router;
