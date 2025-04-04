var express = require("express");
var dashboardRouter = express.Router();
const { fetchNumberOfItemsSoldPerProduct, fetchNumberOfProductPerCategory } = require("../Controllers/dashboardController");

dashboardRouter.get("/NumberOfItemsSoldPerProduct", fetchNumberOfItemsSoldPerProduct);

dashboardRouter.get("/NumberOfProductsPerCategory", fetchNumberOfProductPerCategory)

module.exports = dashboardRouter;
