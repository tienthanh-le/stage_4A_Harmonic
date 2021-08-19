/** @format */

const isAdmin = (req, res, next) => {
  if (req.user.role == 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ msg: 'Only admins can access this route' });
  }
};

module.exports = isAdmin;
