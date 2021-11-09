// import des modules pour sécurisation des données
const jwt = require("jsonwebtoken");

// import variables environnementales
const dotEnv = require("dotenv");
dotEnv.config();
const dbSecretToken = process.env.TOKEN_SECRET;

// fonction authentification : on vérifie la connexion utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, dbSecretToken);
    const userId = decodedToken.userId;
    // si l'utilisateur n'est pas connecté ou, pour les requêtes PUT et DELETE, s'il n'est pas le propriétaire de la sauce
    if (!userId || (req.body.userId && req.body.userId !== userId)) {
      res.status(403).json({ message: "Unauthorized request." });
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error });
  }
};
