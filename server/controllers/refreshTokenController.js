const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Persons } = require('../db_models/db_models');
const errorHandlingMiddleware = require('../middleware/errorHandlingMiddleware');

const ACCESS_TOKEN = {
  secret: process.env.ACCESS_TOKEN_SECRET_KEY,
  expiry: process.env.ACCESS_TOKEN_EXPIRY,
};
const REFRESH_TOKEN = {
  secret: process.env.REFRESH_TOKEN_SECRET_KEY,
  expiry: process.env.REFRESH_TOKEN_EXPIRY,
};

const generateAccessJwt = (id,username) => {
  const accessToken = jwt.sign(
    { id,username },
    ACCESS_TOKEN.secret,
    { expiresIn: ACCESS_TOKEN.expiry }
  );
  return accessToken;
}

const handleRefreshToken = async (req,res,next)=> {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      throw new ApiError(400,'No cookies')
    }
    const refreshToken = cookies.refreshToken;
    console.log("refreshToken",refreshToken);
    const user = await Persons.findOne({
      where: { refreshToken }
    });
    if (!user) {
      return res.status(403).send({
        message: `Access Denied. Invalid refresh token`
      });
    }

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN.secret,
      (err,decoded) => {
        if (err || user.username !== decoded.username) {
          return res.status(403).send({ message: "Access denied. Refresh token failed to verify" });
        }
        const accessToken = generateAccessJwt(user.id,user.username);
          return res.json({ accessToken });
      })

  } catch (error) {
    errorHandlingMiddleware(error,req,res)
  }
}

module.exports = {handleRefreshToken};