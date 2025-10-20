const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    // Don't generate ID here - it will be generated in save() for new products
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        // Update existing product
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        if (existingProductIndex >= 0) {
          products[existingProductIndex] = this;
        } else {
          // If product with this ID doesn't exist, add it as new
          products.push(this);
        }
      } else {
        // New product - generate ID and add
        this.id = new Date().toISOString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
      console.log('Deleted Product with id:', id);
    });
  }

  static getProductById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
