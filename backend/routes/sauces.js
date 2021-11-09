// import express et router
const express = require("express");
const router = express.Router();

// on récupère les fonctions dans les controllers > sauces
const sauceCtrl = require("../controllers/sauces");

// on récupère les middleware d'authentification et multer pour les images
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// on crée les routes
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/:id/like", auth, sauceCtrl.rateOneSauce);

module.exports = router;
