const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const dbSecretToken = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, dbSecretToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({ message: "unauthorized request" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
