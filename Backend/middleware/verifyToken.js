const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "your_jwt_secret"); // Extract token from "Bearer <token>"
    req.user = { userId: decoded.userId }; // Add user ID to request object
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
