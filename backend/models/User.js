// import mongoose
const mongoose = require("mongoose");

// import mongoose unique validator pour s'assurer qu'un utilisateur s'inscrit avec une adresse mail donnée
const uniqueValidator = require("mongoose-unique-validator");

// création du modèle d'objet user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// on utilise le plugin unique validator sur le modèle
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
