const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.Logger = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && !req.headers.authorization.startsWith("Bearer")) {
      return res.status(400).json({
        success: false,
        error: 'Authorization header is missing or invalid',
      });
    }
    token = req.headers.authorization.split(" ")[1]; 
    let decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
  next();
};