const ApiError = require("../error/apiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Persons } = require('../db_models/db_models');
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");
require('dotenv').config();

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

const generateRefreshJwt = (id,username) => {
  const refreshToken = jwt.sign(
    { id,username },
    REFRESH_TOKEN.secret,
    { expiresIn: REFRESH_TOKEN.expiry }
  );
  return refreshToken;
}

class UserController {
  async registration(req,res,next) {
    try {
    const { email,password, username, firstName, lastName } = req.body;
    if (!username || !password) {
      throw new ApiError(400, 'Wrong username or password')
    }
    const ifEmailExists = await Persons.findOne({ where: { email } });
    if (ifEmailExists) {
      throw new ApiError(400, 'User with this email already exists')
    }
    const ifUsernameExists = await Persons.findOne({ where: { username } });
    if (ifUsernameExists) {
      throw new ApiError(400, 'User with this username already exists')
    }
    const hashPassword = await bcrypt.hash(password,5);
    const user = await Persons.create({ email,password: hashPassword, username: username, firstName: firstName, lastName: lastName});

      return res.status(201).send({
        message: `User ${user.username} was created successfully`
      });
    } catch (error) {
      errorHandlingMiddleware(error, req, res)
    }
  }

  async login(req,res,next) {
    try {
      const { username,password } = req.body;
    const user = await Persons.findOne({
      where: { username }
    });
    if (!user) {
      throw new ApiError(400, 'User with this username does not exist')
    }
    let comparePassword = bcrypt.compareSync(password,user.password);
    if (!comparePassword) {
      throw new ApiError(400, 'Incorrect password')
    };
    const accessToken = generateAccessJwt(user.id,user.username);
    const refreshToken = generateRefreshJwt(user.id,user.username);
    
    //storing refresh token in the DB to verify
    await Persons.update({ refreshToken: refreshToken }, {
      where: {
        username: user.username,
      },
    });
    //sending refresh token in a cookie
    res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,//30 days
      httpOnly: true,//not available to javascript, more secure than localStorage
    });
    //sending access token as a respone to client
    return res.json({ accessToken });
    } catch (error) {
      errorHandlingMiddleware(error, req, res)
    }
  }

  async logout (req,res,next) {
    // On client, also delete the accessToken
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) {
        res.status(204).send({message: "No cookies to delete"}); 
      }
      const refreshToken = cookies.refreshToken;
      console.log("refreshToken:",refreshToken);
      // is RefreshToken in DB?
      const user = await Persons.findOne({
        where: { refreshToken }
      });
      if (!user) {
        //clear the cookies, need to give all the specs we gave when creating this cookie
        res.clearCookie('refreshToken', {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        
        return res.status(204).send({
          message: `Cookies cleared`
        });
      }
  
      //Delete refreshToken from DB
      await Persons.update({ refreshToken: null }, {
        where: {
          username: user.username,
        },
      });
      //clear the cookies, need to give all the specs we gave when creating this cookie
      res.clearCookie('refreshToken', {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
  
      return res.status(204).send({message: "Refresh tokens deleted form cookies and DB"})
  
    } catch (error) {
      errorHandlingMiddleware(error,req,res)
    }
  }

  async check(req,res,next) {
    try {
      const cookies = req.cookies;
      if (!cookies) {
        res.status(403).send({message: "Not logged-in (no cookies)"}); 
      }
      if (!cookies?.refreshToken) {
        res.status(403).send({message: "No refresh token"}); 
      }
      const refreshToken = cookies.refreshToken;
      const user = await Persons.findOne({
        where: { refreshToken }
      });
      if (!user) {
        res.status(403).send({message: "Invalid refresh token"}); 
      };
      return refreshToken;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();