const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
    });
  });
};


exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};


exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};


exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchAll(products => {
    const product = products.find(p => p.id === prodId);
    if (product) {
      // Add the product to the cart
      req.session.cart = req.session.cart || [];
      req.session.cart.push(product);
    }
    res.redirect('/cart');
  });
};
