// middlewares/checkRole.js
module.exports = function checkRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Acceso denegado. Rol no autorizado.' });
    }
    next();
  };
};