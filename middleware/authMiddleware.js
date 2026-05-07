import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    // Get token from header
    const token = req.headers.authorization;

    // Check token exists
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided ❌",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "secretkey");

    // Attach user data
    req.user = decoded;

    console.log("Logged in user:", req.user);

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message: "Invalid token ❌",
    });
  }
};

export default authMiddleware;