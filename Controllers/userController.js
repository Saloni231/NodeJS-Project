const mongoose = require('mongoose');
const User = require('../Models/userSchema');
const { generateToken } = require('../tokenGenerator');

async function logIn(req,res) {
    let input = req.body;
    let user = await User.findOne({email: input.email, password: input.password});
    if(user) {
        let payload = {firstName: user.firstName, mobile: user.mobile, password: user.password};
        let token = generateToken(payload);
        res.status(200).send({token ,user});
    }
    else {
        res.status(401).send('Invalid Username or Password');
    }
}

async function fetchUsers(req,res) {
    const { page, recordPerPage } = req.body;
    let users = await User.find({}).populate("product").skip((recordPerPage * page) - recordPerPage).limit(recordPerPage);
    if(users) {
        const count = await User.count();
        const pageData = {
            totalRecords: count,
            totalPages: Math.ceil(count/recordPerPage),
            page,
            recordPerPage
        }
        res.status(200).send({users, pageData});
    } else {
        res.status(401).send("No User Found");
    }
}

module.exports = {logIn, fetchUsers};