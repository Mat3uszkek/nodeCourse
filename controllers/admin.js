const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchAll(products => {
    const product = products.find(p => p.id === prodId);
    if (!product) {
      return res.redirect('/admin/products');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product
    });
  });
};


exports.saveEditedProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const { title, imageUrl, description, price } = req.body;

  Product.fetchAll(products => {
    const productIndex = products.findIndex(p => p.id === prodId);
    if (productIndex < 0) {
      return res.redirect('/admin/products');
    }
    const updatedProduct = new Product(title, imageUrl, description, price);
    updatedProduct.id = prodId; // retain the original id
    products[productIndex] = updatedProduct;

    const fs = require('fs');
    const path = require('path');

    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );

    fs.writeFile(p, JSON.stringify(products), err => {
      if (err) {
        console.log(err);
      }
      res.redirect('/admin/products');
    });
  });
};
