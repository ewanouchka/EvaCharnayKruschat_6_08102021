// import mongoose
const mongoose = require("mongoose");

// création du modèle d'objet sauce
// les likes et dislikes sont par défaut implémentés à 0
// le tableau des utilisateurs likant ou dislikant est vide par défaut
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: Array, required: true, default: [] },
  usersDisliked: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
