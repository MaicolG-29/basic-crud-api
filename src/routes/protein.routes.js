const express = require("express");
const router = express.Router();
const proteinController = require("../controllers/protein.controller");

router.get("/", proteinController.getAllProteins);
router.post("/", proteinController.postProtein);
router.get("/:id", proteinController.getProteinById);
router.put("/:id", proteinController.updateProteinById)
router.delete("/:id", proteinController.deleteProteinById)

module.exports = router;