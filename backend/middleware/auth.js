const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  if (req.originalUrl === "/api/login" || req.originalUrl === "/api/register")
    next();
  else {
    const token = req.headers["token"];

    if (token == null) return res.sendStatus(401);
    try {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      if (error) return res.sendStatus(403);

      //   }
    }
  }
};
module.exports = authenticateToken;
