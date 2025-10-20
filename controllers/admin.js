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


  Product.getProductById(prodId, (existingProduct) => {
    if (!existingProduct) {
      return res.redirect('/admin/products');
    }

    const updatedProduct = new Product(title, imageUrl, description, price);
    updatedProduct.id = prodId; // retain the original id

    updatedProduct.save();
    res.redirect('/admin/products');
  });
};
