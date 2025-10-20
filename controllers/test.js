const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('test/index', {
      prods: products,
      pageTitle: 'Test',
      path: '/test',
    });
  });
};
