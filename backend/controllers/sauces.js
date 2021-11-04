const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Nouvelle sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.file) {
        // si la requête comporte une modification de l'image
        // on supprime l'image précédente de la base
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // on crée ensuite un nouvel objet avec la requête et l'image
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        // si la requête ne comporte pas de modification de l'image, on renvoit la requête updateOne
        Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.rateOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const ratedObject = req.body; // {userId, like}

      // si le frontend renvoie 1 (on like une sauce)
      if (ratedObject.like === 1) {
        sauce.likes = parseInt(sauce.likes) + 1;
        sauce.usersLiked.push(ratedObject.userId);

        Sauce.updateOne(
          { _id: req.params.id },
          {
            likes: sauce.likes,
            usersLiked: sauce.usersLiked,
            dislikes: sauce.dislikes,
            usersDisliked: sauce.usersDisliked,
            _id: req.params.id,
          }
        )
          .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
          .catch((error) => res.status(400).json({ error }));
      }

      // si le frontend renvoie -1 (on dislike une sauce)
      if (ratedObject.like === -1) {
        sauce.dislikes = parseInt(sauce.dislikes) + 1;
        sauce.usersDisliked.push(ratedObject.userId);

        Sauce.updateOne(
          { _id: req.params.id },
          { dislikes: sauce.dislikes, usersDisliked: sauce.usersDisliked, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Vous n'aimez pas cette sauce !" }))
          .catch((error) => res.status(400).json({ error }));
      }

      // si le frontend renvoie 0 (le même userID clique à nouveau sur like ou sur dislike)
      if (ratedObject.like === 0) {
        if (sauce.usersLiked.indexOf(ratedObject.userId) !== -1) {
          sauce.likes = parseInt(sauce.likes) - 1;
          sauce.usersLiked.splice(sauce.usersLiked.indexOf(ratedObject.userId), 1);
        }

        if (sauce.usersDisliked.indexOf(ratedObject.userId) !== -1) {
          sauce.dislikes = parseInt(sauce.dislikes) - 1;
          sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(ratedObject.userId), 1);
        }

        Sauce.updateOne(
          { _id: req.params.id },
          {
            likes: sauce.likes,
            usersLiked: sauce.usersLiked,
            dislikes: sauce.dislikes,
            usersDisliked: sauce.usersDisliked,
            _id: req.params.id,
          }
        )
          .then(() => res.status(200).json({ message: "Votre vote a bien été annulé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })

    .catch((error) => res.status(400).json({ error }));
};
