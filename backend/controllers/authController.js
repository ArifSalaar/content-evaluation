const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const response = require('../utils/responseHandler');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return response.badRequest(res, 'All fields are required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return response.badRequest(res, 'Email already registered');
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);

    return response.created(res, 'User registered successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return response.internalServerError(res, 'Registration failed', { error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return response.unauthorized(res, 'Invalid email or password');
    }

    const token = generateToken(user);

    return response.ok(res, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return response.internalServerError(res, 'Login failed', { error: err.message });
  }
};



const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return response.unauthorized(res, 'No token provided');

    // Find the user by token
    const user = await User.findOne({ tokens: token });
    if (!user) return response.unauthorized(res, 'Invalid token');

    // Delete the user completely
    await User.deleteOne({ _id: user._id });

    return response.ok(res, 'User logged out and deleted successfully');
  } catch (err) {
    return response.internalServerError(res, 'Logout failed', { error: err.message });
  }
};


module.exports = { register, login, logout };
