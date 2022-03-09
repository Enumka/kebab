const welcomeUser = (req, res, next) => {
  res.locals.userName = req.session?.userName;
  res.locals.userId = req.session?.userId;
  next();
};

module.exports = { welcomeUser };
