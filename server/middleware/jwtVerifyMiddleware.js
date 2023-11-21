require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "Access Denied. No token provided" });
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err,decoded) => {
        if (err) return res.status(403).json({ message: "Access Denied. Invalid Access Token" });
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    res.status(403).json({ message: "Access Denied. Invalid Access Token" })
  }
}

module.exports = verifyJWT;