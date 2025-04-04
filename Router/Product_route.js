var express = require('express')
var productRouter = express.Router();

const {fetchProducts, fetchProductsByCategory, fetchProductsByName} = require('../Controllers/productController');

productRouter.get("/",fetchProducts);

productRouter.get("/:category", fetchProductsByCategory)

productRouter.get("/:category/:name", fetchProductsByName)

module.exports = productRouter;