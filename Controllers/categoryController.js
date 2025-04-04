const mongoose = require('mongoose');
const Category = require("../Models/categorySchema");

async function fetchCategory(req, res) {
    const category = await Category.aggregate([{
        $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "ProductsInCategory"
        }
    }])
    res.status(200).send(category);
}

module.exports = {fetchCategory};