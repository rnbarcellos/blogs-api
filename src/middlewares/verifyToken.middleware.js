const { verifyToken } = require('../auth/jwt');
const status = require('../utils/httpStatusCode');

const verifyTokenMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });

  const token = authorization.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = verifyTokenMiddleware;