const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

router.get("/", tableController.getAllTables);
router.get("/:id", tableController.getTableById);
router.post("/", tableController.postTable);
router.put("/:id", tableController.updateTableById);
router.delete("/:id", tableController.deleteTableById);

module.exports = router;
