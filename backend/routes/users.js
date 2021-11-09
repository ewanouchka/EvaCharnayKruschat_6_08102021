// import express et router
const express = require("express");
const router = express.Router();

// on récupère les fonctions dans les controllers > users
const userCtrl = require("../controllers/users");

// on crée les routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
