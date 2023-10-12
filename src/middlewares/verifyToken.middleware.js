const { verifyToken } = require('../auth/jwt');
const status = require('../utils/httpStatusCode');

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = verifyTokenMiddleware;