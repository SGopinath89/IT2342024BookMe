const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = { userId: decoded.userId }; // Add user ID to request object

    // Optionally, you can add user information to response headers if needed
    res.setHeader("X-User-Id", decoded.userId);

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
