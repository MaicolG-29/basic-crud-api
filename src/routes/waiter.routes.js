const express = require("express");
const router = express.Router();
const waiterController = require("../controllers/waiter.controller");

router.get("/", waiterController.getAllWaiters);
router.get("/:id", waiterController.getWaiterById);
router.post("/", waiterController.postWaiter);
router.put("/:id", waiterController.updateWaiterById);
router.delete("/:id", waiterController.deleteWaiterById);

module.exports = router;