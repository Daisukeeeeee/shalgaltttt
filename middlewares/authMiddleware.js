const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authorization token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); 
    const user = await User.findById(decoded.userId); 

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found.' });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
