const ApiError = require("../error/apiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Persons } = require('../db_models/db_models');
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");

const generateJwt = (id,username) => {
  return jwt.sign(
    { id,username },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
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
    const token = generateJwt(user.id,user.username);
    
    res.cookie('token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
   });

    return res.json({token});
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
    const token = generateJwt(user.id,user.username);
      
    res.cookie('token', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
      
    return res.json({ token });
    } catch (error) {
      errorHandlingMiddleware(error, req, res)
    }
  }

  async check(req,res,next) {
    const token = generateJwt(req.user.id,req.user.username);
    res.cookie('token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ token });
  }
}

module.exports = new UserController();