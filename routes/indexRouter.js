const router = require('express').Router();
const {Product} = require('../db/models')



router.get('/', async (req, res) => {
  let product;
try {
  product = await Product.findAll({where: {status: true}});
  console.log('product =====>>>>', product);
} catch (error) {
  return res.render('error', {
    message: 'Не удалось получить записи из базы данных.',
    error: {}
  });
}
  res.render('index', { product });
});

module.exports = router;
