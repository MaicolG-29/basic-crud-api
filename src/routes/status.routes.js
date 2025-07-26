const express = require("express");
const router = express.Router();
const statusController = require("../controllers/status.controller");

router.get("/", statusController.getAllStatuses);
router.get("/:id", statusController.getStatusById);
router.post("/", statusController.postStatus);
router.put("/:id", statusController.updateStatusById);
router.delete("/:id", statusController.deleteStatusById);

module.exports = router;