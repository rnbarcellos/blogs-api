const jwt = require('jsonwebtoken');

const NO_SECRET = new Date().getTime().toString().slice(0, -4);
const JWT_SECRET = process.env.JWT_SECRET || NO_SECRET;

const jwtConfig = {
  expiresIn: '10m',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  verifyToken,
};