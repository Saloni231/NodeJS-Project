const mongoose = require('mongoose');
const Product = require('../Models/productSchema');

async function fetchProducts(req,res) {
    const {page, recordPerPage} = req.query;
    console.log(req.body);
    let products = await Product.find().skip((page * recordPerPage) - recordPerPage).limit(recordPerPage).sort({name: -1});
    if(!products) {
        res.status(401).send({errorMsg: "Products not found"});
    }
    else {
        const count = await Product.count();
        const pageData = {
            totalRecords: count,
            totalPages: Math.ceil(count/recordPerPage),
            page,
            recordPerPage
        }
        res.status(200).send({products, pageData});
    }
}

async function fetchProductsByCategory(req, res) {
    const {page, recordPerPage} = req.query;
    var productsByCategory = await Product.find({category: req.params.category}).skip((page * recordPerPage) - recordPerPage).limit(recordPerPage).sort({name: -1});
    if(!productsByCategory) {
        res.status(401).send({errorMsg: "Looks like we have nothing here!!"})
    }
    else {
        const count = (await Product.find({category: req.params.category})).length;
        const pageData = {
            totalRecords: count,
            totalPages: Math.ceil(count/recordPerPage),
            page,
            recordPerPage
        }
        res.status(200).send({productsByCategory, pageData})
    }
}

async function fetchProductsByName(req, res) {
    var productsByName = await Product.find({category: req.params.category, name: req.params.name});
    if(!productsByName) {
        res.status(401).send({errorMsg: "Looks like we have nothing here!!"})
    }
    else {
        res.status(200).send(productsByName)
    }
}

module.exports = {fetchProducts, fetchProductsByCategory, fetchProductsByName};