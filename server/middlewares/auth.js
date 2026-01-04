const jwt = require("jsonwebtoken");
const { PrismaClient } = require('../prisma/generated');
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret";

const authenticate = async (req, res, next) => {
  try {
    // 1. Check for token in Authorization header
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided or invalid format",
      });
    }
    // 2. Try to verify the access token
    try {

      const decoded = jwt.verify(token, SECRET_KEY);

      req.userId = decoded.userId;

      // 3. Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }
   
      req.user = user;
      return next();
    } catch (verifyError) {
      console.error("Token verification error:", verifyError);
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error- Middleware"
    });
  }
};





module.exports = { authenticate };