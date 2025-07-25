const express = require("express");
const router = express.Router();
const baseController = require("../controllers/base.controller");

router.get("/", baseController.getAllBases);
router.get("/:id", baseController.getBaseById);
router.post("/", baseController.postBase);
router.put("/:id", baseController.updateBaseById);
router.delete("/:id", baseController.deleteBaseById);

module.exports = router;