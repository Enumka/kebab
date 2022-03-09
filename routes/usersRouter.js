const router = require('express').Router();
const sha256 = require('sha256');
const { User, Roles } = require('../db/models');

router.get('/signup', (req, res) => {
  res.render('register');
});

router.post('/signup', async (req, res) => {
  const {
    name, email, tel, roleId,
  } = req.body;
  const password = sha256(req.body.password);
  console.log('=====================>', name, email, password, roleId);
  try {
    const user = await User.create({
      name, email, password, tel, roleId,
    });
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userTel = user.tel;
    req.session.userRoleId = user.roleId;
    res.redirect('/');
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

router.get('/signin', (req, res) => {
  res.render('loginPage');
});

router.post('/signin', async (req, res) => {
  const { email, password, roleId } = req.body;
  console.log(email, password, roleId);
  try {
    const user = await User.findOne({ where: { email, roleId } });
    if (user) {
      if (user.password === sha256(password)) {
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.userEmail = user.email;
        req.session.userTel = user.tel;
        req.session.userRoleId = user.roleId;
        res.redirect('/users/profile');
      } else {
        res.send('wrong password');
      }
    } else {
      res.redirect('/users/signup');
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/profile', async (req, res) => {
  res.render('profile');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('login');
  res.redirect('/');
});

router.get('/profile', async (req, res) => {
  const user = await User.findByPk(req.session.userId);
  res.render('profile', { user });
});

module.exports = router;
