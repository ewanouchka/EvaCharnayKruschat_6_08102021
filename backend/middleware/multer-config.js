// import module multer pour la gestion des fichiers images
const multer = require("multer");

// définition des formats d'images permis
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// objet de configuration de multer
const storage = multer.diskStorage({
  // on détermine l'emplacement d'enregistrement
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // et le format du nom du fichier (nom+timestamp.extension)
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // on supprime les espaces éventuels du nom du fichier importé, remplacés par "_"
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
