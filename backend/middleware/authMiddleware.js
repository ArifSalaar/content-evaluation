const jwt = require('jsonwebtoken');
const User = require('../models/User');
const response = require('../utils/responseHandler');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return response.unauthorized(res, 'Token missing');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return response.unauthorized(res, 'User not found');

    req.user = user; // 🔹 safely set req.user
    next();
  } catch (err) {
    return response.unauthorized(res, 'Invalid or expired token');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return response.unauthorized(res, 'User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      return response.forbidden(res, 'Access denied: insufficient privileges');
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };







// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const response = require('../utils/responseHandler');

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return response.unauthorized(res, 'Token missing');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     //  req.user = user;    //add this line
//     next();
    
//   } catch (err) {
//     return response.unauthorized(res, 'Invalid or expired token');
//   }
// };

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return response.forbidden(res, 'Access denied: insufficient privileges');
//     }
//     next();
//   };
// };

// module.exports = { authenticate, authorizeRoles };


