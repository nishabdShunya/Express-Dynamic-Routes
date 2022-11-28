const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(result => {
      // console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => { console.log(err) });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  };
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(result => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: result[0]
      });
    })
    .catch(err => { console.log(err) });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findAll({ where: { id: prodId } })
    .then(result => {
      result[0].title = updatedTitle;
      result[0].imageUrl = updatedImageUrl;
      result[0].price = updatedPrice;
      result[0].description = updatedDesc;
      return result[0].save();
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => { console.log(err) });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  /* METHOD-1
  Product.findAll({ where: { id: prodId } })
    .then(result => {
      result[0].destroy();
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
  */
  // METHOD-2
  Product.destroy({ where: { id: prodId } })
    .then(res.redirect('/admin/products'))
    .catch(err => { console.log(err) });
};