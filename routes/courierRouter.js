const router = require('express').Router();
const { User } = require('../db/models');
const { Product } = require('../db/models');

router.get('/', async (req, res) => {
  const product = await Product.findAll({ where: { status: true } });
  res.render('addProduct', { product });
});



router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);
    console.log(product);
    // res.sendStatus(200);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
