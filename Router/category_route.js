const express = require('express');
const categoryRouter = express.Router();
const { fetchCategory } = require("../Controllers/categoryController");

categoryRouter.get("/", fetchCategory)

module.exports = categoryRouter;